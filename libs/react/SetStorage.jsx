import {Component} from "react";
import {CuppaStorage} from "../cuppa.storage";
import PropTypes from "prop-types";

export class SetStorage extends Component {
	static store = {LOCAL:"LOCAL"};
	static propTypes = {name:PropTypes.string, store:PropTypes.string, data:PropTypes.any, forceUpdate:PropTypes.bool};
	static defaultProps = {name:"default", store:"", data:null, forceUpdate:true};

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
