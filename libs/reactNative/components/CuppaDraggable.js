import React, {Component} from 'react';
import {PanResponder, View} from "react-native";
import PropTypes from 'prop-types';
import {gsap, AutoKillTweens} from 'gsap-rn';

export class CuppaDraggable extends Component {
	static propTypes = {style:PropTypes.any, justCallback:PropTypes.bool, onPress:PropTypes.func, onDoublePress:PropTypes.func, onLongPress:PropTypes.func, onStart:PropTypes.func, onMove:PropTypes.func, onRelease:PropTypes.func, disabled:PropTypes.bool, onLayout:PropTypes.func};
	static defaultProps = {styles:null, justCallback:false, onPress:null, onDoublePress:null, onLongPress:null, onStart:null, onMove:null, onRelease:null, disabled:false, onLayout:null};
	state = {};
	swipeConfig = {gestureIsClickThreshold:5};
	panResponder;
	layout = {x:0, y:0, width:0, height:0};
	rootRef;
	tweens = {};
	longPressTime = 500;

	constructor(props){
		super(props); bindAll(this);
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, state) => {
				if(this.props.disabled) return false;
				return !this.isClick(state);
			},
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, state) => true,
			onPanResponderGrant:this.onStart,
			onPanResponderMove: this.onMove,
			onPanResponderRelease:this.onRelease,
		});
	}

	isClick(state) {
		let result = Math.abs(state.dx) < this.swipeConfig.gestureIsClickThreshold && Math.abs(state.dy) < this.swipeConfig.gestureIsClickThreshold;
		return result;
	}

	initialLayout;
	initialTimestamp = 0;
	longPressDetectorTimestamp;
	onStart(e, state){
		if(this.props.onStart) this.props.onStart(e, state);
		// detect long press
		this.initialTimestamp = Date.now();
		clearTimeout(this.longPressDetectorTimestamp);
		this.longPressDetectorTimestamp = setTimeout(()=>{ this.onLongPress(e, state); }, this.longPressTime);

		if(this.props.justCallback) return;
		this.initialLayout = {...this.layout};
	}

	set({left, top} = {}){
		if(left != undefined){ gsap.set(this.rootRef, {style: {left}}); }
		if(top != undefined){ gsap.set(this.rootRef, {style: {top}}); }
	}

	onMove(e, state){
		clearTimeout(this.longPressDetectorTimestamp);
		if(this.props.onMove) this.props.onMove(e, state);
		if(this.props.justCallback) return;
		gsap.set(this.rootRef, {style: {left:this.initialLayout.x + state.dx, top:this.initialLayout.y + state.dy}});
	}

	onRelease(e, state){
		clearTimeout(this.longPressDetectorTimestamp);
		let elapse = Date.now() - this.initialTimestamp;
		if(this.isClick(state) && elapse < this.longPressTime){ this.onPress(e, state); return; }
		if(this.props.onRelease) this.props.onRelease(e, state);
		if(this.props.justCallback) return;
	}

	onPress(e, state){
		if(this.props.onPress) this.props.onPress(e, state);
		this.checkDoubleClick(e, state);
	}

	lastPress = 0;
	checkDoubleClick(e, state){
		const time = Date.now();
		const delta = time - this.lastPress;
		const DOUBLE_PRESS_DELAY = 600;
		if (delta < DOUBLE_PRESS_DELAY) {
			if(this.props.onDoublePress) this.props.onDoublePress(e, state);
		}
		this.lastPress = time;
	}

	onLongPress(e, state){
		if(this.props.onLongPress) this.props.onLongPress(e, state);
	}

	render() {
		return (
			<View
				{...this.panResponder.panHandlers}
				style={[{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(255,0,0,0.3)", position:'absolute', minWidth:20, minHeight:20}, this.props.style]}
				pointerEvents={this.props.disabled ? 'box-none' : 'auto'}
				ref={ref=>{
					if(ref){
						this.rootRef = ref;
					}
				}}
				onLayout={(e) => {
					this.layout = e.nativeEvent.layout;
					if(this.props.onLayout) this.props.onLayout(this.layout);
				}}
			>
				<AutoKillTweens tweens={this.tweens} />
				{this.props.children}
			</View>
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