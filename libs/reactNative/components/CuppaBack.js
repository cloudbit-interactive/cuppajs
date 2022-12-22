import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import PropTypes from "prop-types";

export class CuppaBack extends Component{
	static propTypes = {callback:PropTypes.func, closeApp:PropTypes.bool};
	static defaultProps = {callback:null, closeApp:false};

	constructor(props) {
		super(props);
		this.state = {  };
	}

	componentDidMount(){
		BackHandler.addEventListener('hardwareBackPress', this.onHandler);
	}

	onHandler = function(){
		if(this.props.callback) this.props.callback();
		if(!this.props.closeApp){
			return true;
		}else{
			return false;
		}
	}.bind(this);

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.onHandler);
	}

	render(){ return null }
}
