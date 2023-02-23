import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {gsap, AutoKillTweens, Expo, Linear} from "gsap-rn";

export class CuppaSwitch extends Component {
	static propTypes ={checked:PropTypes.bool, disabled:PropTypes.bool, callback:PropTypes.func, style:PropTypes.any, styleBall:PropTypes.any, styleFocus:PropTypes.any, background:PropTypes.string, backgroundChecked:PropTypes.string, autoFocus:PropTypes.bool};
	static defaultProps = {checked:false, disabled:false, callback: null, style:null, styleBall:null, styleFocus:null, background:"#BBB", backgroundChecked:"#2196F3", autoFocus:false};
	state = {};
	tweens = {tween1:null};
	borderRef;

	constructor(props){
		super(props); bindAll(this);
		let style = {...styles.style, ...props.style};
		let styleBall = {...styles.styleBall, ...props.styleBall};
		this.state = {checked:false, style, styleBall};
	}

	componentDidMount(){
		this.checked(this.props.checked, 0, true);
		if(this.props.disabled) gsap.set(this.refs.cover, {style:{opacity:0.6}});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.checked != this.props.checked) this.checked(this.props.checked, 0.3, true);
	}

	checked(value, duration = 0.3, silence = false){
		if(value == undefined) value = !this.state.checked;
		this.setState({checked:value});
		if(value){
			let pos = this.state.style.width-this.state.styleBall.width-this.state.styleBall.left;
			this.tweens.tween1 = gsap.timeline();
			this.tweens.tween1.to(this.refs.cover, {duration, style: {backgroundColor:this.props.backgroundChecked} } );
			this.tweens.tween1.to(this.refs.ball, {duration, style: {left:pos}}, 0);
		} else{
			let pos = this.state.styleBall.left;
			this.tweens.tween1 = gsap.timeline();
			this.tweens.tween1.to(this.refs.cover, {duration, style: {backgroundColor:this.props.background} } );
			this.tweens.tween1.to(this.refs.ball, {duration, style: {left:pos}}, 0 );
		}

		if(silence == false && this.props.callback) this.props.callback(value);
	}

	onFocus(){
		if(this.props.disabled) return;
		AutoKillTweens.tweensOf(this.tweens);
		this.tweens.line = gsap.to(this.borderRef, {duration:1, style:{opacity:0.95}, repeat:-1, yoyo:true, ease:Linear.easeNone});

	}

	onBlur(){
		if(this.props.disabled) return;
		AutoKillTweens.tweensOf(this.tweens);
		this.tweens.line = gsap.to(this.borderRef, {duration:0.3, style:{opacity:0}});
	}

	render() {
		let {disabled, autoFocus} = this.props;
		return (
			<Pressable
				disabled={disabled}
				onPress={()=>{ this.checked() }}
				onPressIn={this.onFocus}
				onPressOut={this.onBlur}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				hasTVPreferredFocus={autoFocus}
			>
				<AutoKillTweens tweens={this.tweens} />
				<View ref={"cover"} style={[this.state.style]}>
					<View ref={"ball"} style={[this.state.styleBall]} ></View>
				</View>
				<View
					ref={ref=>{ if(ref){ this.borderRef = ref } }}
					style={[styles.line, this.props.styleFocus]}
					pointerEvents={"none"}
				></View>
			</Pressable>
		);
	}
}

const styles = StyleSheet.create({
	style:{width:50, height:27, backgroundColor:"#E85975", borderRadius:32, justifyContent:"center", alignItems:"flex-start"},
	styleBall:{borderRadius:22, width:22, height:22, backgroundColor:"#EBEBEB", left:2, elevation:3},
	line:{position:"absolute", left:-3, right:-3, top:-3, bottom:-3, borderRadius:32, borderWidth:3, borderColor:"#FFF", opacity:0},
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
