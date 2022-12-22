import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {cuppa, log} from '../../cuppa';
import {CuppaDraggable} from './CuppaDraggable';
import {gsap, AutoKillTweens, Power2, Back} from 'gsap-rn';

export class CuppaSlider extends Component {
	static propTypes = {value:PropTypes.number, callback: PropTypes.func, style: PropTypes.any, from:PropTypes.number, to:PropTypes.number, parentElement:PropTypes.any, steps:PropTypes.bool, styleButton:PropTypes.any, styleBar:PropTypes.any};
	static defaultProps = {value:null, callback: null, style: null, from:1, to:5, parentElement:null, steps:true, styleButton:null, styleBar:null};
	state = {value:this.props.value};
	values = [];
	barRef = React.createRef();
	btnRef = React.createRef();
	parentLayout = {};
	btnLayout = {};
	tweens = {};

	constructor(props) {
		super(props); cuppa.bindAll(this);
		this.values = cuppa.arrayFromTo(props.from, props.to);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.value !== this.props.value){
			this.setButton(this.props.value);
		}
	}

	onStart(e, state){
		this.props.parentElement.disable(true);
		this.setPosition({x:state.x0});
	}

	onMove(e, state){
		this.setPosition({x:state.moveX});
	}

	onRelease(e, state){
		this.props.parentElement.disable(false);
	}

	onPress(){
		this.props.parentElement.disable(false);
	}

	setPosition({x = 0} = {}){
		let pos = (x-this.parentLayout.x)-this.btnLayout.width*0.5;
		if(pos < 0) pos = 0;
		if(pos > this.parentLayout.width - this.btnLayout.width){
			pos = this.parentLayout.width - this.btnLayout.width
		}
		let percent = cuppa.percent(pos, 0, this.parentLayout.width-this.btnLayout.width);
		if(this.props.steps){
			let number = cuppa.percentNumber(percent, this.props.from, this.props.to);
			this.setButton(number);
		}else{
			gsap.set(this.btnRef, {style:{left:pos}});
		}
	}

	setButton(number){
		if(number === undefined) number = this.state.value;
		if(!this.parentLayout.width || !this.btnLayout.width || !number) return;
		let percent = cuppa.percent(number, this.props.from, this.props.to);
		let pos = (this.parentLayout.width-this.btnLayout.width)*percent;
		this.setState({value:number});

		this.tweens.tween1 = gsap.timeline();
		this.tweens.tween1.to(this.btnRef, {duration:0.3, ease:Power2.easeOut, style:{left:pos}});
		this.tweens.tween1.to(this.barRef, {duration:0.3, ease:Power2.easeOut, style:{width:`${percent*100}%`}}, 0);
		if(this.props.callback){
			this.props.callback(number);
		}
	}

	render(){
		let value = this.state.value;
		return (
			<View
				style={[CuppaSliderStyle.wrap, this.props.style]}
				onLayout={(e)=>{
					if(this.parentLayout.width) return;
					this.parentLayout = e.nativeEvent.layout;
					this.setButton();
				}}
			>
				<AutoKillTweens tweens={this.tweens} />
				<View
					ref={(ref)=>{ if(!ref) return; this.barRef = ref; }}
					style={[CuppaSliderStyle.bar, this.props.styleBar]}
				/>
				{this.values.map(value=>{
					return (
						<View
							key={value}
							style={[CuppaSliderStyle.backValues]}
						>
							<Text style={{color:'#333'}}>{value}</Text>
						</View>
					)
				})}
				<View
					ref={(ref)=>{ if(!ref) return; this.btnRef = ref; }}
					style={[CuppaSliderStyle.button, {width: `${(1/this.values.length)*100}%`, opacity:(value !== null) ? 1 : 0}, this.props.styleButton]}
					onLayout={(e)=>{
						if(this.btnLayout.width) return;
						this.btnLayout = e.nativeEvent.layout;
						this.setButton();
					}}
				>
					<Text style={[CuppaSliderStyle.buttonText]}>{this.state.value}</Text>
				</View>
				<CuppaDraggable
					justCallback={true}
					onPress={this.onPress}
					onStart={this.onStart}
					onMove={this.onMove}
					onRelease={this.onRelease}
					style={CuppaSliderStyle.cover}
				/>
			</View>
		)
	}
}

export const CuppaSliderStyle = StyleSheet.create({
	wrap:{ backgroundColor:'#eee', width:'100%', height:40, borderRadius: 40, flexDirection:'row', alignItems:'center', overflow:'hidden'},
	cover:{position:'absolute', left:0, top:0, right:0, bottom:0, backgroundColor:'transparent'},
	bar:{position:'absolute', left:0, top:0, bottom:0, width:'0%', backgroundColor:'rgba(76,125,231, 0.1)'},
	backValues:{ flex:1, height:40, alignItems:'center', justifyContent:'center'},
	button:{width: 40, height:40, position:'absolute', borderRadius:40, backgroundColor:'#FFF', borderWidth:2, borderColor:'#4C7DE7', flexDirection: 'row', justifyContent: 'center', alignItems:'center'},
	buttonText:{ fontWeight:'bold', color:'#666'},
})
