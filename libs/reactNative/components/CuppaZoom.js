import React, {Component} from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import {cuppa, log} from "../../cuppa";
import {CuppaDraggable} from "./CuppaDraggable";
import {gsap, Power2, AutoKillTweens} from "gsap-rn";

function calcDistance(x1, y1, x2, y2) {
	let dx = Math.abs(x1 - x2)
	let dy = Math.abs(y1 - y2)
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function calcCenter(x1, y1, x2, y2) {
	function middle(p1, p2) {
		return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
	}
	return {
		x: middle(x1, x2),
		y: middle(y1, y2),
	};
}

export default class CuppaZoom extends Component {
	static propTypes = {style:PropTypes.any, resistance:PropTypes.number, maxZoom:PropTypes.number, minZoom:PropTypes.number};
	static defaultProps = {styles:null, resistance:0.4, maxZoom:8, minZoom:0.7};
	wrapDims;
	childDims;
	childRef;
	initialTransform = {x:0,y:0, scale:1};
	onTransition = false;

	constructor(props) {
		super(props); cuppa.bindAll(this);
	}

	componentDidMount() {
		this.tween = gsap.set(this.childRef, {transform:this.initialTransform});
	}

	prevPinchData;
	onStart(e, state){
		this.prevPinchData = null;
		if(e.nativeEvent.touches?.length === 2) {

		}else if(e.nativeEvent.touches?.length === 1){
			if(this.tween?.vars?.transform){
				this.setInitialTransform(this.tween?.vars?.transform);
			}
		}
	}

	getPinchData(touch1, touch2){
		if(!touch1 || !touch2) return;
		let distance = calcDistance(touch1.pageX, touch1.pageY, touch2.pageX, touch2.pageY);
		let center = calcCenter(touch1.pageX, touch1.pageY, touch2.pageX, touch2.pageY);
		return {distance, center};
	}

	onMove(e, state){
		if(e.nativeEvent.touches?.length === 2){
			let pinchData = this.getPinchData(e.nativeEvent.touches[0], e.nativeEvent.touches[1]);
			if(!pinchData) return;
			if(!this.prevPinchData){
				this.prevPinchData = pinchData;
				return;
			}
			let distance = pinchData.distance - this.prevPinchData.distance;
			let transform = this.getInitialTransform();
			transform.scale += distance*0.01;
			if(transform.scale < this.props.minZoom) transform.scale = this.props.minZoom;
			if(transform.scale > this.props.maxZoom) transform.scale = this.props.maxZoom || 4;
			this.tween = gsap.to(this.childRef, {duration:0.1, transform});
			this.prevPinchData = pinchData;
			this.setInitialTransform(transform);
		}else if(e.nativeEvent.touches?.length === 1){
			let transform = this.getInitialTransform();
			if(transform.scale === 1) return;
			let x = (transform.x || 0) + state.dx;
			let y = (transform.y || 0) + state.dy;
			let scale = transform.scale || 1;
			this.tween = gsap.to(this.childRef, {duration:0.1, transform:{x, y, scale}});
		}
	}

	onRelease(e, state){
		this.prevPinchData = null;
		if(this.tween?.vars?.transform) this.setInitialTransform(this.tween?.vars?.transform);
		this.validateBounces();
	}

	validateBounces(){
		this.prevPinchData = null;
		let transform = this.getInitialTransform();
		if(transform.scale <= 1){
			transform.scale = 1;
			transform.x = 0;
			transform.y = 0;
			this.onTransition = true;
			this.tween = gsap.to(this.childRef, {duration:0.3, transform, ease:Power2.easeInOut, onComplete:()=>{
					this.onTransition = false;
				}});
			this.setInitialTransform(transform);
		}
	}

	onDoublePress(e, state){
		this.prevPinchData = null;
		if(this.onTransition){ return; }
		this.onTransition = true;
		let transform = this.getInitialTransform();
		if(transform.scale > 1){
			transform.scale = 1;
			transform.x = 0;
			transform.y = 0
			this.tween = gsap.to(this.childRef, {duration:0.3, transform, ease:Power2.easeInOut, onComplete:()=>{this.onTransition = false;} });
			this.setInitialTransform(transform);
		}else{
			transform.scale = this.props.maxZoom || 4;
			this.tween = gsap.fromTo(this.childRef, {duration:0.3, transform:{ scale:1 }}, {transform, ease:Power2.easeInOut, onComplete:()=>{this.onTransition = false;} });
			this.setInitialTransform(transform);
		}
	}

	setInitialTransform(transform){
		if(!transform) return;
		this.initialTransform = transform;
	}
	getInitialTransform(){
		let transform = this.initialTransform || {};
		transform.x = transform.x || 0;
		transform.y = transform.y || 0;
		transform.scale = transform.scale || 1;
		return transform
	}

	render(){
		return(
			<View
				style={[{flex:1, backgroundColor:'#000', overflow:'hidden'}, this.props.style]}
				ref={ref=>{ if(!ref) return; this.rootRef = ref; }}
				onLayout={(e)=>{ if(this.wrapDims?.width) return; this.wrapDims = e.nativeEvent.layout; }}
			>
				<AutoKillTweens tweens={this} />
				<View
					style={{flex:1}}
					ref={(ref)=>{ if(!ref) return; this.childRef = ref; }}
					onLayout={(e)=>{ if(this.childDims?.width) return; this.childDims = e.nativeEvent.layout; }}
				>
					{this.props.children}
				</View>
				<CuppaDraggable
					justCallback={true}
					style={{flex:1,width:'100%', height:'100%', backgroundColor:'transparent'}}
					onStart={this.onStart}
					onMove={this.onMove}
					onRelease={this.onRelease}
					onDoublePress={this.onDoublePress}
				/>
			</View>
		)
	}
}
