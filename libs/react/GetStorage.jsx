import {Component} from "react";
import {CuppaStorage} from "../cuppa.storage";
import PropTypes from "prop-types";

export class GetStorage extends Component{
	static store = {LOCAL:"LOCAL"};
	static propTypes = {callback:PropTypes.func, name:PropTypes.string, store:PropTypes.string, defaultValue:PropTypes.any};
	static defaultProps = {name:"default", store:"", defaultValue:null, callback:null};

	constructor(props){
		super(props);
		this.onUpdateStorage = this.onUpdateStorage.bind(this);
	};

	componentDidMount() {
		CuppaStorage.getData({name:this.props.name, callback:this.onUpdateStorage, defaultValue:this.props.defaultValue, store:this.props.store}).then();
	}

	onUpdateStorage(data){
		if(this.props.callback) this.props.callback(data);
	};

	componentWillUnmount() {
		CuppaStorage.removeCallback({name:this.props.name, callback:this.onUpdateStorage});
	}

	render() { return (null); }
};
