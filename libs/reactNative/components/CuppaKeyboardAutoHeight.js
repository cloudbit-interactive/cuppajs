import {Keyboard, Platform, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {cuppa} from '../../cuppa';

export class CuppaKeyboardAutoHeight extends Component {
	static propTypes = {style:PropTypes.any, offset:PropTypes.number, callback:PropTypes.func, callbackOnly:PropTypes.bool}
	static defaultProps = {style:null, offset:0, callback:null, callbackOnly:false}
	state = {height:0}

	constructor(props){
		super(props); cuppa.bindAll(this);
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
