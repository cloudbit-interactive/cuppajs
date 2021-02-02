/** 
 *  Ways to import
 *  import {CuppaRouter} from "cuppa.router.js";
 *  import "cuppa.router.js"
 *  <script src="cuppa.router.js" type="module"></script>
 * **/

export class CuppaRouter{
    opts;
    routes = [];
    callbackSet = new Set();

    constructor(opts){
        this.opts = {...{root:"", hash:"", resolveAll:false, titlesMap:{} }, ...opts};
        window.addEventListener("popstate", this.onHistory.bind(this));
    }

    updateLinks(elements){
        if(!elements) elements = document.querySelectorAll("a");
        elements.forEach(element => {
            element.onclick = this.onClick.bind(this)
        });
    }

    onClick(e){
        let element = e.currentTarget;
        let path = element.getAttribute("href");
        let target = element.getAttribute("target");
        let title = element.getAttribute("title");
        if(path == undefined || path.search("http") != -1) return;
        if(target && target != "_self") return;
        if(title) this.opts.titlesMap[path] = title;
        e.preventDefault();
        this.setPath(path, title);
    }

    setPath(path, title, addToHistory = true){
        if(!path){
            let url = new URL(window.location.href);
            path = window.location.href.replace(url.origin, "");
            path = path.replace(this.opts.root,"");
            path = path.replace(this.opts.hash,"");
        }
        if(path == undefined || path == "") path = " ";
        if(path == "#" || path == "/" || path == " ") path = " ";
        else path = this.opts.hash+path;

        if(!title && path == " ") title = this.opts.titlesMap[""] || this.opts.titlesMap["/"] || this.opts.titlesMap["*"];
        if(!title && path) title = this.opts.titlesMap[path]
        if(title == undefined) title = "";
        if(title) document.title = title;

        if(addToHistory) window.history.pushState(path, title, path);
        this.resolve();
    }

    getPath(){
        let base = document.querySelector("base");
            base = (base) ? base.href : "";
        let url = new URL(window.location.href);
        let path = window.location.href;
            if(base && base != "/") path = path.replace(base, "");
            path = path.replace(url.origin, "");
            path = path.replace(this.opts.root,"");
            path = path.replace(this.opts.hash,"");
        return path;
    }

    onHistory(e){
        let path = e.state || "";
            path = path.replace(this.opts.hash, "");
        this.setPath(path, "", false);
    }

    on(path, callback, opts = {exact:true, strick:false}){
        opts = {...{exact:true, strick:false}, ...opts}
        this.routes.push({path, callback, opts});
    }

    resolve(path){
        if(!path) path = this.getPath();
        let resolved = false;
        for(let i = 0; i < this.routes.length; i++){
            let route = this.routes[i];
            let match = this.match(path, route.path, route.opts.exact, route.opts.strict);
            if(match && route.callback){
                resolved = true;
                route.callback(match);
            }
            if(resolved && !this.opts.resolveAll) break;
        }
        this.callbackSet.forEach((func)=>{ func(this.getPath()) })
    }

    match(path, route, exact = true, strict = false){
        if(route == "*"){
            return {path};
        }else{
            let match = matchPath(path, {path: route, exact, strict});
            return match;
        }
    }

    addListener(func){
        if(!func) return;
        if( this.callbackSet.has(func) ) return;
        this.callbackSet.add(func) 
    }

    removeListener(func){
        if(!func) return;
        if(!this.callbackSet.has(func)) return;
        this.callbackSet.delete(func)
    }

    getPathData(path){
        if(!path) path = this.getPath();
        let url = new URL(window.location.href);
        let obj = {url:window.location.href};
        // path
            if(path.indexOf("?") != -1) path = path.substr(0, path.indexOf("?"));
            obj.path = path;
            obj.pathArray = path.split("/");
            obj.pathArray = obj.pathArray.filter(item=>item);
        // domain
            obj.domain = url.host;
        // protocol / port
            obj.protocol = url.protocol;
            obj.port = url.port;
        // get data
            let dataStr = path;
            if(dataStr.indexOf("?") != -1 || dataStr.indexOf("#") != -1){
                if(dataStr.indexOf("?") != -1) dataStr = dataStr.substr(path.indexOf("?")+1);
                if(dataStr.indexOf("#") != -1) dataStr = dataStr.substr(path.indexOf("#")+1);
                let dataArray = dataStr.split("&");
                let data = {};
                for(let i = 0; i < dataArray.length; i++){
                    let parts = dataArray[i].split("=");
                    if(parts[0]) data[parts[0]] = parts[1] || '';
                };
                obj.data = data;
            }else{ obj.data = {}; };
        return obj;
    }
}

window.CuppaRouter = CuppaRouter;

// DEPENDENCIES
const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
	const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
	const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

	if (pathCache[path]) return pathCache[path];

	const keys = [];
	const regexp = pathToRegexp(path, keys, options);
	const result = { regexp, keys };

	if (cacheCount < cacheLimit) {
		pathCache[path] = result;
		cacheCount++;
	}

	return result;
}

function matchPath(pathname, options = {}) {
		if (typeof options === "string" || Array.isArray(options)) {
			options = { path: options };
		}
	
		const { path, exact = false, strict = false, sensitive = false } = options;
	
		const paths = [].concat(path);
	
		return paths.reduce((matched, path) => {
			if (!path && path !== "") return null;
			if (matched) return matched;
	
			const { regexp, keys } = compilePath(path, {
				end: exact,
				strict,
				sensitive
			});
			const match = regexp.exec(pathname);
	
			if (!match) return null;
	
			const [url, ...values] = match;
			const isExact = pathname === url;
	
			if (exact && !isExact) return null;
	
			return {
				path, 
				url: path === "/" && url === "" ? "/" : url,
				isExact,
				params: keys.reduce((memo, key, index) => {
					memo[key.name] = values[index];
					return memo;
				}, {})
			};
		}, null);
}


var PATH_REGEXP = new RegExp([
		'(\\\\.)',
		'([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
		'([.+*?=^!:${}()[\\]|\\/])'
	].join('|'), 'g');

function escapeGroup (group) {
		return group.replace(/([=!:$\/()])/g, '\\$1');
	}

var attachKeys = function (re, keys) {
		re.keys = keys;
		return re;
};

function pathToRegexp(path, keys, options){
    if (keys && !Array.isArray(keys)) {
        options = keys;
        keys = null;
    }

    keys = keys || [];
    options = options || {};

    var strict = options.strict;
    var end = options.end !== false;
    var flags = options.sensitive ? '' : 'i';
    var index = 0;

    if (path instanceof RegExp) {
        var groups = path.source.match(/\((?!\?)/g) || [];

        keys.push.apply(keys, groups.map(function (match, index) {
            return {
                name:      index,
                delimiter: null,
                optional:  false,
                repeat:    false
            };
        }));

        return attachKeys(path, keys);
    }

    if (Array.isArray(path)) {
        path = path.map(function (value) {
            return pathtoRegexp(value, keys, options).source;
        });

        return attachKeys(new RegExp('(?:' + path.join('|') + ')', flags), keys);
    }

    path = path.replace(PATH_REGEXP, function (match, escaped, prefix, key, capture, group, suffix, escape) {
        if (escaped) {
            return escaped;
        }

        if (escape) {
            return '\\' + escape;
        }

        var repeat   = suffix === '+' || suffix === '*';
        var optional = suffix === '?' || suffix === '*';

        keys.push({
            name:      key || index++,
            delimiter: prefix || '/',
            optional:  optional,
            repeat:    repeat
        });

        prefix = prefix ? '\\' + prefix : '';

        capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

        if (repeat) {
            capture = capture + '(?:' + prefix + capture + ')*';
        }

        if (optional) {
            return '(?:' + prefix + '(' + capture + '))?';
        }

        return prefix + '(' + capture + ')';
    });

    var endsWithSlash = path[path.length - 1] === '/';

    if (!strict) {
        path = (endsWithSlash ? path.slice(0, -2) : path) + '(?:\\/(?=$))?';
    }

    if (!end) {
        path += strict && endsWithSlash ? '' : '(?=\\/|$)';
    }

    return attachKeys(new RegExp('^' + path + (end ? '$' : ''), flags), keys);
};