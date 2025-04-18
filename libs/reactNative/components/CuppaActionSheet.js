/* 0.0.1 */
import React, {Component} from 'react';
import {BackHandler, Dimensions, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import PropTypes from "prop-types";
import {CuppaDraggable} from './CuppaDraggable';
import {AutoKillTweens, gsap, Linear, Power2} from 'gsap-rn';

export class CuppaActionSheet extends Component{
	static propTypes = {closeCallback:PropTypes.func, style:PropTypes.any, tension:PropTypes.number, handlerStyle:PropTypes.any, contentDraggable:PropTypes.bool, disabled:PropTypes.bool};
	static defaultProps = {closeCallback:null, style:null, tension:5, handlerStyle:null, contentDraggable:true, disabled:false};
	state = {disabled:false};
	tweens = {};
	swipeConfig = {velocityThreshold: 0.3, directionalOffsetThreshold: 80, gestureIsClickThreshold: 5};
	contentLayout;
	draggableRef = React.createRef();
	CuppaActionSheet;
	wrapRef;
	backgroundRef;
	contentRef;

	constructor(props) {
		super(props); bindAll(this);
		Keyboard.dismiss();
	}

	pastParentRef(props){
		let children = props.children;
		if(!children) return;
		if(!Array.isArray(children)) children = [children];

		(children || []).forEach(child=>{
			child.props.cuppaActionSheet = this;
			child.cuppaActionSheet = this;
		})
	}

	config(){
		gsap.set(this.backgroundRef, {style:{opacity:0}});
		gsap.set(this.contentRef, {transform:{y:Dimensions.get('window').height+this.contentLayout.height}});
		gsap.set(this.wrapRef, {style:{opacity:1}});
		this.open();
	}

	onMove(e, state){
		let percent = state.dy/this.contentLayout.height;
		gsap.set(this.backgroundRef, {style:{opacity:1-percent}});
		if(percent < 0){
			gsap.set(this.contentRef, {transform:{y:Dimensions.get('window').height+(state.dy/this.props.tension)}});
		}else{
			gsap.set(this.contentRef, {transform:{y:Dimensions.get('window').height+state.dy}});
		}
	}

	onStart(e, state){ }

	onRelease(e, state){
		let [validSwipe, direction] = this.isValidSwipe(state.vy, this.swipeConfig.velocityThreshold, state.dx, this.swipeConfig.directionalOffsetThreshold);
		if(validSwipe){
			if(direction > 0) this.close({ease:Linear.easeNone, duration:0.15});
			if(direction < 0) this.open({ease:Power2.easeNone});
			return;
		}

		let percent = state.dy/this.contentLayout.height;
		if(percent >= 0.5){
			this.close();
		}else{
			this.open();
		}
	}

	open({ease = Power2.easeOut, duration = 0.4} = {}){
		AutoKillTweens.kill(this.tweens);
		this.tweens.tween = gsap.timeline();
			this.tweens.tween.to(this.backgroundRef, {duration, style:{opacity:1}, ease:Linear.easeNone});
			this.tweens.tween.to(this.contentRef, {duration, transform:{y:Dimensions.get('window').height}, ease}, 0);
	}

	close({ease = Power2.easeIn, duration = 0.3} = {}){
		AutoKillTweens.kill(this.tweens);
		this.tweens.tween = gsap.timeline({onComplete:this.props.closeCallback});
			this.tweens.tween.to(this.backgroundRef, {duration, style:{opacity:0}, ease:Linear.easeNone});
			this.tweens.tween.to(this.contentRef, {duration, transform:{y:Dimensions.get('window').height+this.contentLayout.height}, ease}, 0);
	}

	isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
		let result = Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
		return [result, velocity];
	}

	disable(value){
		this.setState({disabled:value})
	}

	render(){
		return (
			<View ref={ref=>this.wrapRef=wrap} style={[CuppaActionSheetStyles.cover, {opacity:0}]}>
				<AutoKillTweens tweens={this.tweens} />
				<Pressable ref={ref=>this.backgroundRef=ref} onPress={this.close} style={[CuppaActionSheetStyles.blockade]} />
				<View
					ref={ref=>this.contentRef=ref}
					style={[CuppaActionSheetStyles.content, this.props.style]}
				>
					<View
						onLayout={(e)=>{ this.contentLayout = e.nativeEvent.layout; this.config(); }}
					>
						<CuppaDraggable
							disabled={this.state.disabled}
							justCallback={true}
							onStart={this.onStart}
							onMove={this.onMove}
							onRelease={this.onRelease}
							ref={this.draggableRef}
							style={{backgroundColor:'transparent', position:'relative'}}
						>
							<View style={[CuppaActionSheetStyles.handler, this.props.handlerStyle]}></View>
							{!this.props.contentDraggable ? null : (
								<View style={{flex:1, width:'100%'}}>
									{ React.cloneElement(this.props.children, { cuppaActionSheet:this }) }
								</View>
							)}
						</CuppaDraggable>
						{this.props.contentDraggable ? null : (
							<View style={{flex:1, width:'100%'}}>
								{ React.cloneElement(this.props.children, { cuppaActionSheet:this }) }
							</View>
						)}
					</View>
					<View style={{height:Dimensions.get('window').height, backgroundColor:this.props.style?.backgroundColor || CuppaActionSheetStyles.content.backgroundColor}}></View>
				</View>
			</View>
		) }
}

export const CuppaActionSheetStyles = StyleSheet.create({
	cover:{ position:"absolute", top:0, left:0, right:0, bottom:0, },
	blockade:{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.5)"},
	content:{position:'absolute', bottom:0, left:0, right:0, backgroundColor: '#FFF', borderTopLeftRadius:20, borderTopRightRadius:20},
	handler:{width:80, height:5, backgroundColor:'#ccc', marginVertical:25, borderRadius:10},
})

function bindAll(element, isFunction){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	if(isFunction)  propertyNames = Object.keys(element);
	for(let i = 0; i < propertyNames.length; i++){
		if(typeof element[propertyNames[i]] == "function"){
			element[propertyNames[i]]= element[propertyNames[i]].bind(element);
		};
	};
};
