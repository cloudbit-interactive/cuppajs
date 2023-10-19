import {Dimensions, Keyboard, Platform, ScrollView, View} from "react-native";
import React, {Component} from "react";
import PropTypes from "prop-types";

export class CuppaScrollView extends Component{
	static propTypes = {style:PropTypes.any, contentContainerStyle:PropTypes.any, scrollRef:PropTypes.func, offset:PropTypes.number, alwaysBounceVertical:PropTypes.bool};
	static defaultProps = {style:null, contentContainerStyle:null, scrollRef:null, offset:0, alwaysBounceVertical:true};
	state = {height:0};
	scrollRef;
	scrollLayout;
	scrollStats = {
		"contentInset": {"bottom": 0, "left": 0, "right": 0, "top": 0},
		"contentOffset": {"x": 0, "y": 0},
		"contentSize": {"height": 0, "width": 0},
		"layoutMeasurement": {"height": 617, "width": 390},
		"zoomScale": 1,
	};
	touchData = {"identifier": 0, "locationX": 0, "locationY": 0, "pageX": 0, "pageY": 0, }

	constructor(props) {
		super(); bindAll(this);
	}

	componentDidMount(){
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
	}

	onKeyboardShow(e){
		if(Platform.OS != "ios") return;
		let keyboardHeight = e.endCoordinates.height;
		this.setState({height:keyboardHeight}, ()=>{
			setTimeout(()=>{
				let screenDim = Dimensions.get("window");
				let currentScrollPosition = this.scrollStats?.contentOffset?.y;
				if(this.touchData.pageY+this.props.offset <= screenDim.height-keyboardHeight) return;
				let scrollTo = this.touchData.pageY-this.scrollLayout.y+currentScrollPosition-200-this.props.offset;
				this.scrollRef.scrollTo({ x: 0, y:scrollTo, animated: true });
			}, 50);
		});
	}

	onKeyboardHide(e){ this.setState({height:0}); }

	componentWillUnmount(){
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	render(){
		return(
			<ScrollView
				{...this.props}
				style={this.props.style}
				contentContainerStyle={this.props.contentContainerStyle}
				ref={ref=>{
					if(!ref) return;
					this.scrollRef = ref;
					if(this.props.scrollRef) this.props.scrollRef(ref);
				}}
				onScroll={(e)=>{ this.scrollStats = e.nativeEvent; }}
				onLayout={(e)=>{ this.scrollLayout = e.nativeEvent.layout; }}
				scrollEventThrottle={16}
				onTouchStart={(e) => {this.touchData = e.nativeEvent}}
				alwaysBounceVertical={this.props.alwaysBounceVertical}
			>
				{this.props.children}
				<View style={[{height:this.state.height, backgroundColor:'transparent'}]}></View>
			</ScrollView>
		)
	}
}

function bindAll(element){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	element["mount"] = true;
	for(let i = 0; i < propertyNames.length; i++){
		if( ["constructor"].indexOf(propertyNames[i]) == -1 ){
			if(typeof element[propertyNames[i]] == "function"){
				element[propertyNames[i]]= element[propertyNames[i]].bind(element);
			};
		};
	};
};
