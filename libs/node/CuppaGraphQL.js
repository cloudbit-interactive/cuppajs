/* v0.0.1 */
import fs from 'fs';
import {mergeTypes} from "merge-graphql-schemas";
import {GraphQLError} from "graphql";

export class CuppaGraphQL{
	/* example:
	*   Question.questions = async ({organizationId, condition = ""}, context, info)=>{
	*   if(CuppaGraphQL.isPathRequested('questions.answers', info)){
	*     // RETRIEVE ROLE INFO
	*   }
	* }
	* */
	static isPathRequested(path, info, returnNode = false){
		if(!path || !info) return;
		if(!Array.isArray(path)) path = path.trim().split(".");
		const nodes = (info.fieldNodes) ? info.fieldNodes : info;
		const node = nodes.find(x => x.name.value === path[0]);
		if(!node){ return false; }
		if (path.length === 1) {
			if(returnNode) return node;
			return true;
		}
		return CuppaGraphQL.isPathRequested(path.slice(1), node.selectionSet.selections, returnNode);
	}

	static getNode(path, info){
		return CuppaGraphQL.isPathRequested(path, info, true);
	}

	static getNodeArguments(path, info, defaultValue){
		let node = CuppaGraphQL.getNode(path, info);
		if(!node) return null;
		let args = {};
			(node?.arguments || []).map(arg=>{
				if(arg?.kind != 'Argument') return;
				args[arg?.name?.value] = arg?.value?.value;
			});
		if(!Object.keys(args).length && !defaultValue) return null;
		args = {...defaultValue, ...args};
		return args;
	}

	static getArgument(argument, path, info, defaultValue){
		let node = CuppaGraphQL.getNode(path, info);
		let arg = (node?.arguments || []).filter(arg=> arg.kind = 'Argument' && arg.name.value == argument)[0];
		let value = arg?.value?.value;
		if(!value && defaultValue) value = defaultValue;
		return value;
	}

	static mergeSchemas(path){
		let files = fs.readdirSync(path);
		let types = []
		files.forEach(file=>{
			if(file.indexOf('.graphql') === -1) return;
			let data = fs.readFileSync(`${path}/${file}`, 'utf8');
			types.push(data);
		})
		return mergeTypes(types);
	}

	static ResolverMiddleware(resolvers, middlewareFunc){
		Object.keys(resolvers).map(key=>{
			if(typeof resolvers[key] !== "function") return;
			let fn = resolvers[key];
			resolvers[key] = async (props, context, info)=>{
				return await middlewareFunc(props, context, info, fn);
			}
		})
		return resolvers;
	}

	static newError({message = 'Error', data = null}){
		return new GraphQLError(message, null, null, null, null, null, data);
	}

	static async _resolveMethod(entities = [], methodName, {args = {}, context} = {}){
		if(!Array.isArray(entities)) entities = [entities];
		let promises = [];
		for(let i = 0; i < entities.length; i++){
			let entity = entities[i];
			if(typeof entity[methodName] !== 'function') continue;
			promises.push(entity[methodName](args, context));
		}
		let result = await Promise.all(promises);
		for(let i = 0; i < result.length; i++){
			entities[i][methodName] = result[i];
		}
	}

	static async resolveMethod(entities = [], path, {args = {}, context} = {}){
		if(!path || !entities) return;
		if(!Array.isArray(entities)) entities = [entities];
		let pathArray = (Array.isArray(path)) ? path : path.trim().split('.');
		if(pathArray.length === 1){
			return await CuppaGraphQL._resolveMethod(entities, pathArray[0], {args, context});
		}
		let methodName = pathArray.pop();
		let extractor = [];
		for(let i = 0; i < pathArray.length; i++){
			let path = pathArray[i];
			let previous = extractor?.length ? extractor[extractor.length - 1] : entities;
			let data = previous.flatMap(p=>p[path]).filter(d=>d);
			extractor.push(data);
		}
		if(!extractor?.length) return;
		return await CuppaGraphQL._resolveMethod(extractor[extractor.length-1], methodName, {args, context});
	}
}
