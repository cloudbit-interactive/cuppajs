/*
<CuppaToast ref={ ref => this.ref = ref } />
this.ref.show('message', {duration:6});
* */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {gsap, AutoKillTweens} from "gsap-rn";

export class CuppaToast extends Component{
	static propTypes = {duration:PropTypes.number, delay:PropTypes.number, fadeIn:PropTypes.number, fadeOut:PropTypes.number, style:PropTypes.any, styleWrap:PropTypes.any, styleText:PropTypes.any  };
	static defaultOpts = {duration:3, delay:0, fadeIn:0.6, fadeOut:0.6, style:null, styleWrap:null, styleText:null}
	state = {message:"", opts:CuppaToast.defaultOpts};
	tweens = {tween1:null};

	constructor(props){
		super(props); bindAll(this);
	}

	show(message, opts){
		if(!message) return;
		opts = {...CuppaToast.defaultOpts, ...opts};
		this.setState({message, opts});
		AutoKillTweens.tweensOf(this.tweens);
		this.tweens.tween1 = gsap.timeline();
		this.tweens.tween1.set(this.refs.root, {style:{opacity:0, display:"flex"}});
		this.tweens.tween1.to(this.refs.root, {style:{opacity:1}, duration:opts.fadeIn, delay:opts.delay});
		this.tweens.tween1.to(this.refs.root, {duration:opts.fadeOut, style:{opacity:0}}, opts.duration);
		this.tweens.tween1.set(this.refs.root, {style:{display:"none"}});
	}

	render(){
		return(
			<View ref="root" pointerEvents="none" style={[{display:"none", paddingHorizontal:20, opacity:0, position:"absolute", left:0, top:"auto", bottom:20, alignItems:"center", width:"100%", justifyContent:"center", elevation:9999, zIndex:9999, overflow:"hidden"}, this.props.styleWrap]}>
				<AutoKillTweens tweens={this.tweens} />
				<View style={[{borderRadius:34, alignItems:"center", justifyContent:"center", backgroundColor:"rgba(0,0,0,0.8)", overflow:"hidden", paddingHorizontal:15, paddingVertical:10}, this.props.style]}>
					<Text style={[{color:"#FFF", textAlign: "center", fontSize:14}, this.props.styleText]}>{this.state.message}</Text>
				</View>
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