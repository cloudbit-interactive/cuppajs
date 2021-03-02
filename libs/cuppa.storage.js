let cuppa = document.defaultView.cuppa || {} 

cuppa.dataDefault = {};
cuppa.data = {};
document.defaultView.cuppa = cuppa;

export function setStorage(name, opts){
    opts = cuppa.mergeObjects([{storage:'', silence:false, data:null}, opts]);
    if(opts.store != undefined) opts.storage = opts.store;

    if(opts["default"] !== undefined && opts["default"] !== null){
        cuppa.dataDefault[name] = opts["default"];
        opts["default"] = null;
        let current = getStorage(name, opts);
        if(current == null || current == undefined) current = cuppa.dataDefault[name];
        opts.data = current;
        setStorage(name, opts).then();
        return;
    }

    cuppa.data[name] = opts.data;
    if(opts.storage === "local"){
        cuppa.localStorage(name, cuppa.jsonEncode(opts.data, false));
    }else if(opts.storage === "session"){
        cuppa.sessionStorage(name, cuppa.jsonEncode(opts.data, false));
    }else if(opts.storage === "cookie"){
        cuppa.setCookie(name, cuppa.jsonEncode(opts.data, false));
    };

    if(!opts.silence) cuppa.executeListener(name, opts.data);
};

export function getStorage(name, opts){
    opts = cuppa.mergeObjects([{storage:'', callback:null, "default":null}, opts]);
    if(opts.store != undefined) opts.storage = opts.store;

    let data = cuppa.data[name];
    if(opts.storage === "local"){
        let ls = cuppa.localStorage(name);
        if(ls) data = cuppa.jsonDecode(ls, false);
    }else if(opts.storage === "session"){
        let st = cuppa.sessionStorage(name);
        if(st) data = cuppa.jsonDecode(st, false);
    }else if(opts.storage === "cookie"){
        let st = cuppa.getCookie(name);
        if(st) data = cuppa.jsonDecode(st, false);
    }

    if(data === undefined){ data = opts["default"]; }

    if(data != undefined && opts.callback){ opts.callback(data); };
    if(opts.callback){ cuppa.addListener(name, opts.callback); };
    return data;
};

export function deleteStorage(name, opts){
    opts = cuppa.mergeObjects([{storage:''}, opts]);
    if(opts.store != undefined) opts.storage = opts.store;
    cuppa.data[name] = null;

    if(opts.storage === "local"){
        localStorage.removeItem(name);
    }else if(opts.storage === "session"){
        sessionStorage.removeItem(name);
    }else if(opts.storage === "cookie"){
        cuppa.deleteCookie(name);
    };
};