/** 
 *  CuppaStorage
 * 
 * **/
export class CuppaStorage{
    static LOCAL = "LOCAL";
    static SESSION = "SESSION";
    static INDEXED_DB = "INDEXED_DB";
    static db;
    static defaultData = {};
    static data = {};
    static callbacks = {};

    static async setData({name = 'default', data = null, store = '', silence = false}){
        if(String(store).toUpperCase() === CuppaStorage.LOCAL){
            localStorage.setItem(name, JSON.stringify(data));
        }else if(String(store).toUpperCase() === CuppaStorage.SESSION){
            sessionStorage.setItem(name, JSON.stringify(data));
        }else if(String(store).toUpperCase() === CuppaStorage.INDEXED_DB){
            await CuppaStorage.db.add(name, data);
        }else{
            CuppaStorage.data[name] = data;
        }

        if(!silence) CuppaStorage.executeCallbacks({name, data});
    }

    static async getData({name = 'default', callback = null, store = '', defaultValue = null,}){
        let data;
        if(String(store).toUpperCase() === CuppaStorage.LOCAL){
            let ls = localStorage.getItem(name);
            if(ls) data = JSON.parse(ls);
        }else if(String(store).toUpperCase() === CuppaStorage.SESSION){
            let st = sessionStorage.getItem(name);
            if(st) data = JSON.parse(st);
        }else if(String(store).toUpperCase() === CuppaStorage.INDEXED_DB){
            data = await CuppaStorage.db.get(name);
        }else{
            data = CuppaStorage.data[name];
        }

        if(data === undefined){ data = defaultValue; }

        if(data != undefined && callback){ callback(data); };
        if(callback){ CuppaStorage.addCallback({name, callback}); };
        return data;
    }

    static getDataSync({name = 'default', callback = null, store = '', defaultValue = null,}){
        let data;
        if(String(store).toUpperCase() === CuppaStorage.LOCAL){
            let ls = localStorage.getItem(name);
            if(ls) data = JSON.parse(ls);
        }else if(String(store).toUpperCase() === CuppaStorage.SESSION){
            let st = sessionStorage.getItem(name);
            if(st) data = JSON.parse(st);
        }else{
            data = CuppaStorage.data[name];
        }

        if(data === undefined){ data = defaultValue; }

        if(data != undefined && callback){ callback(data); };
        if(callback){ CuppaStorage.addCallback({name, callback}); };
        return data;
    }

    static removeCallback({name, callback, toString = false}){
        if(!CuppaStorage.callbacks[name]) return;
        let array = CuppaStorage.callbacks[name];
        for(let i = 0 ; i < array.length; i++ ){
            if(toString){
                if(array[i].toString() === callback.toString()){ array.splice(i, 1); };
            }else{
                if(array[i] === callback){ array.splice(i, 1); };
            }
        };
    };

    static removeAllCallbacks({name}){
        delete CuppaStorage.callbacks[name];
    };

    static executeCallbacks({name, data}){
        if(!CuppaStorage.callbacks[name]) return;
        let array = CuppaStorage.callbacks[name];
        for(let i = 0 ; i < array.length; i++){
            array[i](data);
        };
    };

    static addCallback = function({name, callback}){
        if(!CuppaStorage.callbacks[name]) CuppaStorage.callbacks[name] = [];
        CuppaStorage.callbacks[name].push(callback);
    };
};

if(!document.defaultView.CuppaStorage){
    document.defaultView.CuppaStorage = CuppaStorage;
};

/*
    const storage = {name:"STORAGE_TODO", store:CuppaStorage.INDEXED_DB};
    <get-storage name="${storage.name}"  store="${storage.store}" onupdate="this.onUpdate"></get-storage>
*/
export class GetStorage extends HTMLElement{
    name;
    store;
    default;
    data;

    constructor(){
        super();
        this.onUpdateStorage = this.onUpdateStorage.bind(this);
    };

    connectedCallback() {
        setTimeout(()=>{
            this.name = this.getAttribute("name");
            this.store = this.getAttribute("store");
            this.default = this.getAttribute("default");
            CuppaStorage.getData({name:this.name, callback:this.onUpdateStorage.bind(this), default:this.default, store:this.store}).then();
        }, 0);
    };

    onUpdateStorage(data){
        this.data = data;
        this.dispatchEvent(new CustomEvent("update", {detail:this.data}));
    };

    disconnectedCallback(){
        CuppaStorage.removeCallback({name:this.name, callback:this.onUpdateStorage});
    };
};

if(!document.defaultView.GetStorage){
    customElements.define('get-storage', GetStorage);
    document.defaultView.GetStorage = GetStorage;
};

class CuppaStorageInnoDB{
    config = {db:"cuppa_db", storage:"cuppa_storage", version:1, update:false};
    db;

    constructor(config){
        this.config = {...this.config, ...config};
        this._binAll(this);
    };

    async connect(){
        let config = this.config;
        if(indexedDB.databases){
            let currentDB = await indexedDB.databases();
                currentDB = currentDB.filter(db=>db.name == config.db)[0];
                config.version = (currentDB && config.update) ? currentDB.version + 1 : (currentDB) ? currentDB.version : config.version;
        }else{
            config.version = config.version;
        }
        const request = indexedDB.open(config.db, config.version);
        request.onupgradeneeded = this.onUpdateDB;
        return await new Promise((resolve) => {
            request.onsuccess = (e)=>{
                this.db = e.target.result;
                resolve(this);
            };
        });
    };

    async onUpdateDB(e){
        this.db = e.target.result;
        let {db, config} = this;
        if (!db.objectStoreNames.contains(config.storage)) {
            db.createObjectStore(config.storage, {keyPath: 'name'});
        }
    };

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
    };
    
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
    };

    async delete(name){
        if(!this.db) await this.connect();
        let {db, config} = this;
        let transaction = db.transaction(config.storage, "readwrite");
        let storage = transaction.objectStore(config.storage); 
        storage.delete(name);
    };

    _binAll(element, isFunction){
        let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
        if(isFunction)  propertyNames = Object.keys(element);
        for(let i = 0; i < propertyNames.length; i++){
            if(typeof element[propertyNames[i]] == "function"){
                element[propertyNames[i]]= element[propertyNames[i]].bind(element);
            };
        };
    };
};

CuppaStorage.db = new CuppaStorageInnoDB();