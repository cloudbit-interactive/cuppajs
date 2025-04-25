/* 0.0.1 */
import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from "react-native";
import PropTypes from "prop-types";
import {CuppaAnimations} from "../CuppaAnimations";
import {AutoKillTweens, gsap} from "gsap-rn";

export class CuppaProgress extends Component{
	static propTypes = {color:PropTypes.string, size:PropTypes.number, style:PropTypes.any, onClose:PropTypes.func, text:PropTypes.string, textStyle:PropTypes.any};
	static defaultProps =   { color:"#777777", size:40, style:{}, onClose:null, text:"", textStyle: {} };
	blockadeRef;
	mainRef;


	constructor(props) {
		super(props);
		this.state = {text:this.props.text}
	}
	componentDidMount(){
		CuppaAnimations.popShow({ref:this.mainRef, blockade:this.blockadeRef});
	}

	close(){
		CuppaAnimations.popHide({ref:this.mainRef, blockade:this.blockadeRef, callback:this.props.onClose});
	}

	componentWillUnmount(){
		gsap.killTweensOf(this.blockadeRef);
		gsap.killTweensOf(this.mainRef);

	}

	render() {
		return (
			<View style={[{position:"absolute", top:0, left:0, right:0, bottom:0, justifyContent:"center", alignItems:"center", zIndex:9999, elevation:9999}]}>
				<View ref={ref=>this.blockadeRef=ref} style={{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.7)"}}></View>
				<View ref={ref=>this.mainRef=ref} style={[{padding:20, backgroundColor:"#FFF", borderRadius:5, overflow:"hidden"}, this.props.style]}>
					<ActivityIndicator size={this.props.size} color={this.props.color} />
					{(!this.state.text) ? null : (
						<Text style={[{marginTop:10, textAlign: "center", alignItems:"center"}, this.props.textStyle]}>{this.state.text}</Text>
					)}
				</View>
			</View>
		)
	}
}
