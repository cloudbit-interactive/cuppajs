/* 0.0.1 */

import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet, Keyboard } from "react-native";
import PropTypes from "prop-types";
import {CuppaBack} from './CuppaBack';
import {Button} from '../../../app/components/common/fields/Button';
import {CuppaAnimations} from '../CuppaAnimations';
import {gsap} from 'gsap-rn';

export class CuppaAlert extends Component {
	static propTypes = {
		cancel: PropTypes.string,
		accept: PropTypes.string,
		title: PropTypes.string,
		message: PropTypes.string,
		callback: PropTypes.func,
		inputText: PropTypes.string,
		inputTextFocus:PropTypes.bool,
		backdropCloseAlert: PropTypes.bool,
		portalRef: PropTypes.any,
	};
	static defaultProps = {
		cancel: "Cancel",
		accept: "Accept",
		title: "Message",
		message: "",
		inputText: null,
		inputTextFocus:false,
		backdropCloseAlert: true,
		portalRef: null,
	};
	state = { inputText: this.props.inputText };
	containerRef;
	blockadeRef;
	mainRef;

	constructor(props) {
		super(props); bindAll(this);
	}

	componentDidMount() {
		CuppaAnimations.popShow({ref:this.mainRef, blockade: this.blockadeRef});
		setTimeout(()=>{
			gsap.set(this.containerRef, {style:{opacity:1}});
		}, 100)
	}

	accept() {
		if (this.props.callback) this.props.callback({value:true, inputText:this.state.inputText});
		this.close();
	}

	cancel() {
		if (this.props.callback) this.props.callback({value:false, inputText:this.state.inputText});
		this.close();
	}

	close() {
		CuppaAnimations.popHide({ref:this.mainRef, blockade: this.blockadeRef, callback:()=>{
				if(this.props.portalRef) this.props.portalRef.remove("CuppaAlert");
		}})
	}

	render() {
		return (
			<View ref={ref=>this.containerRef=ref} style={[styles.container, {opacity:0}]}>
				<CuppaBack callback={this.close} />
				<TouchableWithoutFeedback onPress={(this.props.backdropCloseAlert) ? this.close : null}>
					<View ref={ref=>this.blockadeRef=ref} style={{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.6)"}}></View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View ref={ref=>this.mainRef=ref} style={[styles.modal]} >
						<View style={{ padding: 20 }}>
							{(!this.props.title) ? null : <Text style={{ fontSize: 20, color: "#333" }}>{this.props.title}</Text>}
							{(!this.props.message) ? null : <Text style={{ marginTop: 10, position: 'relative', color:"#333" }}>{this.props.message}</Text>}
							{this.props.children}
							{(this.state.inputText === null) ? null : (
								<TextInput
									onChangeText={(inputText) => this.setState({ inputText })}
									value={this.state.inputText}
									style={[styles.textInput, { marginTop: 10, marginBottom: 0 }]}
									autoFocus={this.props.inputTextFocus}
								/>
							)}
							{(!this.props.accept && !this.props.cancel) ? (null) : (
									<View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
										{(!this.props.cancel) ? null : <Button onPress={this.cancel} style={[{ marginRight:10}]} text={this.props.cancel} /> }
										<Button onPress={this.accept} text={this.props.accept} />
									</View>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles =  StyleSheet.create({
	container:{
		position:"absolute",
		top:0,
		left:0,
		right:0,
		bottom:0,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		elevation: 9999,
	},
	modal: {
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 10,
		elevation: 9999,
		width:"100%",
		maxWidth: 400,
	},
	textInput:{
		backgroundColor:"rgba(255,255,255,.15)",
		textAlignVertical:"center",
		color:"#444",
		height:40,
		paddingHorizontal:10,
		borderRadius:15
	}
});

function bindAll(element, isFunction){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	if(isFunction)  propertyNames = Object.keys(element);
	for(let i = 0; i < propertyNames.length; i++){
		if(typeof element[propertyNames[i]] == "function"){
			element[propertyNames[i]]= element[propertyNames[i]].bind(element);
		};
	};
};
