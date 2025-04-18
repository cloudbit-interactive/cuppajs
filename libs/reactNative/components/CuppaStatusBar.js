/* 0.0.1
    Example: <CuppaStatusBar background={"rgba(0,0,0,0.2)"} color={"light-content"} />
*/
import React, {Component} from 'react';
import {StatusBar, Platform, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

/**
 * @typedef {Object} CuppaStatusBar
 * @property {string} background
 * @property {boolean} iosSupport
 * @property {string} color - 'light-content' | 'dark-content'
 */
/**
 * @extends {Component<CuppaStatusBar>}
 */
export class CuppaStatusBar extends Component {
	static color = {lightContext:'light-content', darkContext:'dark-content'};
	static defaultProps = { background:'rgba(0,0,0,0.2)', iosSupport:false, color:CuppaStatusBar.color.darkContext };
	constructor(props) {
		super(props); this.config();
	}

	componentDidMount(){
		this.config();
	}

	config(){
		StatusBar.setBarStyle(this.props.color);
		if (Platform.OS === 'android' && Platform.Version >= 21){
			StatusBar.setBackgroundColor('rgba(0,0,0,0)');
			StatusBar.setTranslucent(true);
		}
	}

	static height(){
		let value = 0;
		if(Platform.OS === 'ios') {
			value = StaticSafeAreaInsets.safeAreaInsetsTop;
		}else if(Platform.OS === 'android' && Platform.Version >= 21){
			value = StatusBar.currentHeight;
		}
		return value;
	}

	static barStyle(style = 'light-content'){
		StatusBar.setBarStyle(style);
	}

	render() {
		return (
			<View style={{height:CuppaStatusBar.height(), width:'100%', backgroundColor:this.props.background}} />
		);
	}
}
