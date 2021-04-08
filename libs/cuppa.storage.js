/** 
 *  CuppaStorage
 * 
 * **/

 export class CuppaStorage{
    static setData(name, opts){
        cuppa.setData(name, opts);
    }

    static getData(name, opts){
        return cuppa.getData(name, opts);
    }

    static deleteData = function(name, opts){
        cuppa.deleteData(name, opts);
    };

    static removeCallback(name, callback){
        cuppa.removeListener(name, callback);
    }

    static removeListener(name,callback){
        CuppaStorage.removeCallback(name, callback);
    }
}

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

cuppa.setData = function(name, opts){
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
    if(opts.storage === "local"){
        localStorage.setItem(name, JSON.stringify(opts.data));
    }else if(opts.storage === "session"){
        sessionStorage.setItem(name, JSON.stringify(opts.data));
    };

    if(!opts.silence) cuppa.executeListener(name, opts.data);
};

cuppa.getData = function(name, opts){
    opts = {...{storage:'', callback:null, "default":null}, ...opts};
    if(opts.store != undefined) opts.storage = opts.store;

    let data = cuppa.data[name];
    if(opts.storage === "local"){
        let ls = localStorage.getItem(name);
        if(ls) data = JSON.parse(ls);
    }else if(opts.storage === "session"){
        let st = sessionStorage.getItem(name);
        if(st) data = JSON.parse(st);
    }

    if(data === undefined){ data = opts["default"]; }

    if(data != undefined && opts.callback){ opts.callback(data); };
    if(opts.callback){ cuppa.addListener(name, opts.callback); };
    return data;
};

cuppa.getDataSync = function(name, opts){
    opts = cuppa.mergeObjects([{"default":null}, opts]);
    let data = cuppa.data[name];
    if(data === undefined) data = opts["default"];
    return data;
};

cuppa.deleteData = function(name, opts){
    opts = cuppa.mergeObjects([{storage:''}, opts]);
    if(opts.store != undefined) opts.storage = opts.store;
    cuppa.data[name] = null;

    if(opts.storage === "local"){
        localStorage.removeItem(name);
    }else if(opts.storage === "session"){
        sessionStorage.removeItem(name);
    };
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