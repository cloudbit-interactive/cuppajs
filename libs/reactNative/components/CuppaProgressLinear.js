/* 0.0.1 */
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {gsap, AutoKillTweens, Expo} from "gsap-rn";
import PropTypes from "prop-types";

export class CuppaProgressLinear extends Component{
	static propTypes = {visible:PropTypes.bool, duration:PropTypes.number, style:PropTypes.any, styleBar:PropTypes.any };
	static defaultProps = {visible:false, duration:0.6, style:null, styleBar:null};
	state = {visible:this.props.visible};
	barRef;

	constructor(props) {
		super(props); bindAll(this);
	}

	componentDidMount(){
		this.visible(this.props.visible);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.visible != this.props.visible) this.visible(this.props.visible);
	}

	visible(value){
		if(value){
			if(this.tl) this.tl.stop();
			this.tl = gsap.timeline({repeat:-1});
			this.tl.set(this.barRef, {style:{width:"0%", left:"0%"}});
			this.tl.to(this.barRef, {duration:this.props.duration*0.5, style:{width:"100%"}});
			this.tl.to(this.barRef, {duration:this.props.duration*0.5, style:{left:"100%"}});
			this.tl.set(this.barRef, {style:{width:"0%", left:"0%"}});
			this.tl.to(this.barRef, this.props.duration, {style:{width:"100%"}});
			this.tl.to(this.barRef, this.props.duration, {style:{left:"100%"}});
		}else{
			if(this.tl) this.tl.stop();
		}
	}

	render() {
		return (
			<View pointerEvents="none" style={[{position:"relative", left:0, top:0, width:"100%", height:5, overflow:"hidden", display:(this.state.visible) ? "flex" : "none", opacity:(this.state.visible) ? 1 : 0 }, this.props.style]}>
				<AutoKillTweens tweens={this} />
				<View ref={ref=>this.barRef=ref} style={[CuppaProgressLinearStyle.cover, {right:"auto", width:"0%", backgroundColor:"#777"}, this.props.styleBar]} ></View>
			</View>
		)
	}
}

const CuppaProgressLinearStyle =  StyleSheet.create({
	cover:{position:'absolute', left:0, top:0, right:0, bottom:0}
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
