import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {AutoKillTweens, gsap, Power2, Expo} from 'gsap-rn';

async function dimAsync(ref){
	if(ref === undefined) return Dimensions.get('window');
	if(!ref) return {x2:0, y2:0, width:0, height:0, x:0, y:0};
	let result = await new Promise((resolve)=>{
		ref.measure( (x2, y2, width, height, x, y)=>{
			resolve({x2, y2, width, height, x, y})
		} )
	});
	return result;
}

export class CuppaCollapsible extends Component{
	static propTypes = {header:PropTypes.any, open:PropTypes.bool, duration:PropTypes.number, callback:PropTypes.func, heightClosed:PropTypes.number, arrowIcon:PropTypes.any, style:PropTypes.any, arrowStyle:PropTypes.any, headerStyle:PropTypes.any};
	static defaultProps = {header:null, open:false, duration:0.4, callback:null, heightClosed:0.0001, arrowIcon:null, style:null, arrowStyle:null, headerStyle:null};
	state = {header:this.props.header};
	_open;
	dimContent = {width:0, height:0};
	tweens = {};

	constructor(props) {
		super(props); bindAll(this);
	}

	async open(value, duration){
		if(duration === undefined) duration = this.props.duration;
		if(value === undefined) value = !this._open;
		if(value){
			this.tweens.tl = gsap.timeline();
			this.tweens.tl.to(this.refs.contentWrap, {duration, style:{height:this.dimContent.height}, ease:Expo.easeInOut});
			if(this.refs.arrowIcon){
				this.tweens.tl.to(this.refs.arrowIcon, {duration, transform:{rotate:"180" }, ease:Power2.easeInOut }, 0);
			}
		}else{
			this.tweens.tl = gsap.timeline();
			this.tweens.tl.to(this.refs.contentWrap, {duration, style:{height:0}, ease:Expo.easeInOut});
			if(this.refs.arrowIcon){
				this.tweens.tl.to(this.refs.arrowIcon, {duration, transform:{rotate:"0" }, ease:Power2.easeInOut }, 0);
			}
		}
		this._open = value;
		if(this.props.callback) this.props.callback(value, this);
	}

	render(){
		return (
			<View style={[this.props.style]}>
				<AutoKillTweens tweens={this.tweens} />
				<TouchableOpacity
					onPress={()=>{ this.open().then() } }
					style={[{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}, this.props.headerStyle]}
				>
						{this.state.header}
						{(this.props.arrowIcon &&
							<Image
								ref="arrowIcon"
								source={this.props.arrowIcon}
								style={[{height:14, width:14, marginHorizontal:20}, this.props.arrowStyle]}
								resizeMode={"contain"}
								fadeDuration={0}
							/>
						)}
				</TouchableOpacity>
				<View ref="contentWrap" style={{overflow:"hidden"}} >
					<View
						ref="content"
					  onLayout={(e)=>{
						  if(this.dimContent?.width) return;
						  this.dimContent = e.nativeEvent.layout;
						  this.open(this.props.open, 0).then();
					  }}
					>

						<View ref="content" onLayout={null} >
							{this.props.children}
						</View>
					</View>
				</View>
			</View>
		)
	}
}

const CuppaCollapsibleStyles = StyleSheet.create({

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