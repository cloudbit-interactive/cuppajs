import React, {Component} from 'react';
import {StatusBar, Platform, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

/* StatusBarComp
    Example: <CuppaStatusBar background={"rgba(0,0,0,0.2)"} color={"light-content"} />
*/
export class CuppaStatusBar extends Component {
	static color = {lightContext:"light-content", darkContext:"dark-content"};
	static propTypes = {background:PropTypes.string, iosSupport:PropTypes.bool, color:PropTypes.oneOf([CuppaStatusBar.color.lightContext, CuppaStatusBar.color.darkContext])};
	static defaultProps = { background:"rgba(0,0,0,0.2)", iosSupport:false, color:CuppaStatusBar.color.darkContext };
	constructor(props) {
		super(props); this.config();
	}

	componentDidMount(){
		this.config();
	}

	config(){
		StatusBar.setBarStyle(this.props.color);
		if (Platform.OS === "android" && Platform.Version >= 21){
			StatusBar.setBackgroundColor('rgba(0,0,0,0)');
			StatusBar.setTranslucent(true);
		}
	}

	static height(){
		let value = 0;
		if(Platform.OS === "ios") {
			value = StaticSafeAreaInsets.safeAreaInsetsTop;
		}else if(Platform.OS === "android" && Platform.Version >= 21){
			value = StatusBar.currentHeight;
		}
		return value;
	}

	static barStyle(style = "light-content"){
		StatusBar.setBarStyle(style);
	}

	render() {
		return (
			<View style={{height:CuppaStatusBar.height(), width:"100%", backgroundColor:this.props.background}}></View>
		);
	}
}
