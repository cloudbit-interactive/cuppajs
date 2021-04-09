/** 
 *  CuppaStorage
 * 
 * **/

export class CuppaStorage{
    static async setData(name, opts){
        return await cuppa.setData(name, opts);
    }

    static async getData(name, opts){
        return await cuppa.getData(name, opts);
    }

    static async deleteData(name, opts){
        await cuppa.deleteData(name, opts);
    };

    static removeCallback(name, callback){
        cuppa.removeListener(name, callback);
    }

    static removeListener(name, callback){
        CuppaStorage.removeCallback(name, callback);
    }

    static removeAllCallbacks(name){
        cuppa.removeListenerGroup(name);
    }
}

CuppaStorage.LOCAL = "LOCAL";
CuppaStorage.SESSION = "SESSION";
CuppaStorage.INDEXED_DB = "INDEXED_DB";

document.defaultView.CuppaStorage = CuppaStorage;

export class GetStorage extends HTMLElement{
    name;
    store;
    default;
    data;

    constructor(){
        super();
        this.onUpdateStorage = this.onUpdateStorage.bind(this);
    }

    connectedCallback() {
        setTimeout(()=>{
            this.name = this.getAttribute("name");
            this.store = this.getAttribute("store");
            this.default = this.getAttribute("default");
            CuppaStorage.getData(this.name, {callback:this.onUpdateStorage, default:this.default, store:this.store});
        }, 0);
    }

    onUpdateStorage(data){
        this.data = data;
        this.dispatchEvent(new CustomEvent("update", {detail:this.data}));
    }

    disconnectedCallback(){
        CuppaStorage.removeCallback(this.name, this.onUpdateStorage);
    }
}

customElements.define('get-storage', GetStorage);
document.defaultView.GetStorage = GetStorage;

/*  DataCenter
    add and remove data in one place
    Examples:
    cuppa.setData('NEW_CLIENT', {data:{name:"Tufik", age":18}})
    cuppa.getData('NEW_CLIENT', {callback:listener});
*/
const cuppa = document.defaultView.cuppa || {};
cuppa.dataDefault = cuppa.dataDefault || {};
cuppa.data = cuppa.data || {};

cuppa.setData = async function(name, opts){
    opts = {...{storage:'', silence:false, data:null}, ...opts};
    if(opts.store != undefined) opts.storage = opts.store;

    if(opts["default"] !== undefined && opts["default"] !== null){
        cuppa.dataDefault[name] = opts["default"];
        opts["default"] = null;
        let current = cuppa.getData(name, opts);
        if(current == null || current == undefined) current = cuppa.dataDefault[name];
        opts.data = current;
        cuppa.setData(name, opts).then();
        return;
    }

    cuppa.data[name] = opts.data;
    if(String(opts.storage).toUpperCase() === CuppaStorage.LOCAL){
        localStorage.setItem(name, JSON.stringify(opts.data));
    }else if(String(opts.storage).toUpperCase() === CuppaStorage.SESSION){
        sessionStorage.setItem(name, JSON.stringify(opts.data));
    }else if(String(opts.storage).toUpperCase() === CuppaStorage.INDEXED_DB){
        await CuppaStorage.db.add(name, opts.data);
    }

    if(!opts.silence) cuppa.executeListener(name, opts.data);
};

cuppa.getData = async function(name, opts){
    opts = {...{storage:'', callback:null, "default":null}, ...opts};
    if(opts.store != undefined) opts.storage = opts.store;

    let data = cuppa.data[name];
    if(String(opts.storage).toUpperCase() === CuppaStorage.LOCAL){
        let ls = localStorage.getItem(name);
        if(ls) data = JSON.parse(ls);
    }else if(String(opts.storage).toUpperCase() === CuppaStorage.SESSION){
        let st = sessionStorage.getItem(name);
        if(st) data = JSON.parse(st);
    }else if(String(opts.storage).toUpperCase() === CuppaStorage.INDEXED_DB){
       data = await CuppaStorage.db.get(name);
    }

    if(data === undefined){ data = opts["default"]; }

    if(data != undefined && opts.callback){ opts.callback(data); };
    if(opts.callback){ cuppa.addListener(name, opts.callback); };
    return data;
};

cuppa.deleteData = async function(name, opts){
    opts = {...{storage:''}, ...opts};
    if(opts.store != undefined) opts.storage = opts.store;
    cuppa.data[name] = null;

    if(opts.storage === "local"){
        localStorage.removeItem(name);
    }else if(opts.storage === "session"){
        sessionStorage.removeItem(name);
    }else if(String(opts.storage).toUpperCase() === CuppaStorage.INDEXED_DB){
        await CuppaStorage.db.delete(name);
    }
};

// add / remove / execute global listeners
cuppa.listeners = cuppa.listeners || {};

cuppa.addListener = function(name, callback){
    if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
    cuppa.listeners[name].push(callback);
};

cuppa.removeListener = function(name, callback, toString){
    if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
    let array = cuppa.listeners[name];
    for(let i = 0 ; i < array.length; i++ ){
        if(toString){
            if(array[i].toString() === callback.toString()){
                array.splice(i, 1);
            };
        }else{
            if(array[i] === callback){
                array.splice(i, 1);
            };
        }
    };
};

cuppa.removeListenerGroup = function(name){
    delete cuppa.listeners[name];
};

cuppa.executeListener = function(name, data){
    if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
    let array = cuppa.listeners[name];
    for(let i = 0 ; i < array.length; i++ ){
        array[i](data);
    };
};

class CuppaStorageInnoDB{
    config = {db:"cuppa_db", storage:"cuppa_storage", version:1, update:false};
    db;

    constructor(config){
        this.config = {...this.config, ...config};
        this._binAll(this);
    }

    async connect(){
        let config = this.config;
        let currentDB = await indexedDB.databases();
            currentDB = currentDB.filter(db=>db.name == config.db)[0];
            config.version = (currentDB && config.update) ? currentDB.version + 1 : (currentDB) ? currentDB.version : config.version;
        const request = indexedDB.open(config.db, config.version);
        request.onupgradeneeded = this.onUpdateDB;
        return await new Promise((resolve) => {
            request.onsuccess = (e)=>{
                this.db = e.target.result;
                resolve(this);
            };
        });
    }

    async onUpdateDB(e){
        this.db = e.target.result;
        let {db, config} = this;
        if (!db.objectStoreNames.contains(config.storage)) {
            db.createObjectStore(config.storage, {keyPath: 'name'});
        }
    }

    async add(name, value, returnValue){
        if(!this.db) await this.connect();
        let {db, config} = this;
        let transaction = db.transaction(config.storage, "readwrite");
        let storage = transaction.objectStore(config.storage); 
        let data = {name, value};
        await new Promise((resolve) => {
            let request = storage.put(data);
                request.onsuccess = ()=>{
                    resolve(request.result);
                };
                request.onerror = (err)=>{
                    resolve(null, err.target.error);
                };
        });
        return await this.get(name, returnValue);
    }
    
    async get(name, returnValue){
        if(returnValue == undefined) returnValue = true;
        if(!this.db) await this.connect();
        let {db, config} = this;
        let transaction = db.transaction(config.storage, "readwrite");
        let storage = transaction.objectStore(config.storage); 
        let result = await new Promise((resolve) => {
            let request = storage.get(name);
            request.onsuccess = ()=>{ 
                resolve(returnValue && request.result ? request.result.value : request.result);
            };
            request.onerror = (err)=>{ resolve(null) };
        });
        return result;
    }

    async delete(name){
        if(!this.db) await this.connect();
        let {db, config} = this;
        let transaction = db.transaction(config.storage, "readwrite");
        let storage = transaction.objectStore(config.storage); 
        storage.delete(name);
    }

    _binAll(element, isFunction){
        let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
        if(isFunction)  propertyNames = Object.keys(element);
        for(let i = 0; i < propertyNames.length; i++){
            if(typeof element[propertyNames[i]] == "function"){
                element[propertyNames[i]]= element[propertyNames[i]].bind(element);
            };
        };
    };
}

CuppaStorage.db = new CuppaStorageInnoDB();