import {Keyboard, Platform, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class CuppaKeyboardAutoHeight extends Component {
	static propTypes = {style:PropTypes.any, offset:PropTypes.number, callback:PropTypes.func, callbackOnly:PropTypes.bool, keep:PropTypes.bool}
	static defaultProps = {style:null, offset:0, callback:null, callbackOnly:false, keep:false}
	state = {height:0}

	constructor(props){
		super(props); bindAll(this);
	}

	componentDidMount(){
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
	}

	onKeyboardShow(e){
		let height = e.endCoordinates.height;
		if(this.props.callbackOnly) height = 0;
		this.setState({height});
		if(this.props.callback) this.props.callback('showed', e.endCoordinates.height);
	}

	onKeyboardHide(e){
		if(this.props.keep) return;
		this.setState({height:0});
		if(this.props.callback) this.props.callback('hidden', 0);
	}

	componentWillUnmount(){
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	render() {
		return (
			<View style={[{height:this.state.height+this.props.offset}, this.props.style]}></View>
		)
	}
}

function bindAll(element, isFunction){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	if(isFunction)  propertyNames = Object.keys(element);
	for(let i = 0; i < propertyNames.length; i++){
		if(typeof element[propertyNames[i]] == "function"){
			element[propertyNames[i]]= element[propertyNames[i]].bind(element);
		};
	};
};
