/**
 * v0.0.2
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Realm from 'realm';

export class RealmDatabase{
	static inst = null;
	static schema = {
		primaryKey:'id',
		name:'CuppaStorageSchema',
		properties:{id:{type: 'string'},value:{type:'string'}}
	}

	static async getInstance(){
		if(RealmDatabase.inst) return this.inst;
		RealmDatabase.inst = await Realm.open({schema: [RealmDatabase.schema]});
		return RealmDatabase.inst;
	};
}

export class CuppaStorage{
	static LOCAL = "LOCAL";
	static db;
	static data = {};
	static callbacks = {};

	static async setData({name = 'defaultStorage', data = null, store = '', silence = false}){
		if(String(store).toUpperCase() === CuppaStorage.LOCAL){
			const realm = await RealmDatabase.getInstance();
			try{
				realm.write(() => {
					realm.create(RealmDatabase.schema.name, {id: name, value: JSON.stringify(data)}, 'modified');
				});
			}catch(err){ }
		}else{
			CuppaStorage.data[name] = data;
		}

		if(!silence) CuppaStorage.executeCallbacks({name, data});
	}

	static async getData({name = 'defaultStorage', callback = null, store = '', defaultValue = null, initialTrigger = true}){
		let data;
		if(String(store).toUpperCase() === CuppaStorage.LOCAL){
			const realm = await RealmDatabase.getInstance();
			try{
				let realmData = JSON.parse(JSON.stringify(realm.objects(RealmDatabase.schema.name).filtered(`id = "${name}"`)))[0];
				if(realmData) data = JSON.parse(realmData?.value);
			}catch(err){ }
		}else{
			data = CuppaStorage.data[name];
		}

		if(data === undefined || data === null){ data = defaultValue; }
		if(data !== undefined && callback && initialTrigger){ callback(data); };
		if(callback){ CuppaStorage.addCallback({name, callback}); };
		return data;
	}

	static getDataSync({name = 'defaultStorage', callback = null, store = '', defaultValue = null,}){
		let data;
		if(String(store).toUpperCase() === CuppaStorage.LOCAL){
			data = null;
		}else{
			data = CuppaStorage.data[name];
		}

		if(data === undefined){ data = defaultValue; }

		if(data != undefined && callback){ callback(data); };
		if(callback){ CuppaStorage.addCallback({name, callback}); };
		return data;
	}

	static removeCallback({name, callback, likeString = false}){
		if(!CuppaStorage.callbacks[name]) return;
		let array = CuppaStorage.callbacks[name];

		for(let i = 0 ; i < array.length; i++ ){
			if(likeString){
				if(array[i].toString() === callback.toString()){ array.splice(i, 1); };
			}else{
				if(array[i] === callback){
					array.splice(i, 1);
				};
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

export class GetStorage extends Component{
	static store = {LOCAL:"LOCAL"};
	static propTypes = {callback:PropTypes.func, name:PropTypes.string, store:PropTypes.oneOf(["",GetStorage.store.LOCAL]), defaultValue:PropTypes.any, initialTrigger:PropTypes.bool};
	static defaultProps = {name:"defaultName", store:"", defaultValue:null, callback:null, initialTrigger:true};
	state = {}
	unmount = false;

	constructor(){
		super();
		this.onUpdateStorage = this.onUpdateStorage.bind(this);
	};

	componentDidMount() {
		CuppaStorage.getData({name:this.props.name, callback:this.onUpdateStorage, defaultValue:this.props.defaultValue, store:this.props.store, initialTrigger:this.props.initialTrigger}).then();
	}

	onUpdateStorage(data){
		if(this.unmount) return;
		if(this.props.callback) this.props.callback(data);
	};

	componentWillUnmount() {
		this.unmount = true;
		CuppaStorage.removeCallback({name:this.props.name, callback:this.onUpdateStorage});
	}

	render() { return (null); }
};

export class SetStorage extends Component {
	static store = {LOCAL:"LOCAL"};
	static propTypes = {name:PropTypes.string, store:PropTypes.oneOf(["", SetStorage.store.LOCAL]), data:PropTypes.any, forceUpdate:PropTypes.bool};
	static defaultProps = {name:"defaultName", store:"", data:null, forceUpdate:true};

	constructor(props){
		super(props);
		this.setData = this.setData.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.forceUpdate){
			this.setData(this.props.data);
		}else if(this.props.data !== prevProps.data){
			this.setData(this.props.data);
		}
	}

	setData(data){
		CuppaStorage.setData({name:this.props.name, data, store:this.props.store}).then();
	}

	componentWillUnmount() {
		CuppaStorage.setData({name:this.props.name, data:null, store:this.props.store}).then();
	}

	render() {
		return (null);
	}
}
