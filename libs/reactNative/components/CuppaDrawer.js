import React, {Component} from 'react';
import {BackHandler, PanResponder, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import PropTypes from "prop-types";
import {cuppa} from "../../cuppa";
import {gsap, AutoKillTweens, Expo} from "gsap-rn";

/* CuppaDrawer */
export class CuppaDrawer extends Component{
    static OPEN = "OPEN";
    static CLOSE = "CLOSE";
    static LEFT = "LEFT";
    static RIGHT = "RIGHT";
    static propTypes ={
        open:PropTypes.bool,
        style:PropTypes.any,
        styleNavBar:PropTypes.any,
        easeOpen:PropTypes.any,
        easeClose:PropTypes.any,
        width:PropTypes.number,
        content:PropTypes.any,
        position:PropTypes.oneOf([CuppaDrawer.LEFT, CuppaDrawer.RIGHT]),
        onOpenStart:PropTypes.func,
        onOpenEnd:PropTypes.func,
        onCloseStart:PropTypes.func,
        onCloseEnd:PropTypes.func,
    };
    static defaultProps = {
        open:false,
        style:null,
        styleNavBar:null,
        easeOpen:Expo.easeOut,
        easeClose:Expo.easeOut,
        width:300, content:null,
        status:CuppaDrawer.OPEN,
        position:CuppaDrawer.LEFT,
        onOpenStart:null,
        onOpenEnd:null,
        onCloseStart:null,
        onCloseEnd:null,
    };
    swipeConfig = {velocityThreshold: 0.3, directionalOffsetThreshold: 80, gestureIsClickThreshold: 5};

    constructor(props){
        super(props); cuppa.bindAll(this);
        this.state = {pointerEvents:"auto"};
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, state) => {
                if(this.isClick(state)) return false;
                if(Math.abs(state.dx) <= Math.abs(state.dy)) return false;
                return true;
            },
            onPanResponderTerminationRequest: (evt, state) => true,
            onPanResponderMove: this.onMove,
            onPanResponderRelease:this.onRelease,
        });
    }

    componentDidMount(){
        if(!this.props.open){
            gsap.set(this.refs.root, {style:{opacity:0}});
            this.close(0);
            this.setState({status:CuppaDrawer.CLOSE});
            BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
        }
    }

    open(duration = 0.4){
        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
        if(this.props.onOpenStart) this.props.onOpenStart(this);
        if(this.props.position == CuppaDrawer.LEFT) {
            if(this.ani){
                this.ani.kill();
            }else{
                gsap.set(this.refs.menu, {style: {left: -this.props.width}});
                gsap.set(this.refs.blockade, {style: {opacity: 0}});
                gsap.set(this, {state: {status: CuppaDrawer.OPEN}});
            }
            gsap.set(this.refs.root, {style: {left: 0, opacity:1}});
            this.ani = gsap.timeline();
            this.ani.to(this.refs.blockade, duration, {style: {opacity: 1}}, 0);
            this.ani.to(this.refs.menu, duration, {style: {left: 0}, ease: this.props.easeOpen}, 0);
            this.ani.add(() => {
                if(this.props.onOpenEnd && duration) this.props.onOpenEnd(this);
            });
        }else{
            if(this.ani){
                this.ani.kill();
            }else{
                gsap.set(this.refs.menu, {style: {right: -this.props.width}});
                gsap.set(this.refs.blockade, {style: {opacity: 0}});
                gsap.set(this, {state: {status:CuppaDrawer.OPEN}});
            }
            gsap.set(this.refs.root, {style: {right: 0, opacity:1}});
            this.ani = gsap.timeline();
            this.ani.to(this.refs.blockade, duration, {style: {opacity: 1}}, 0);
            this.ani.to(this.refs.menu, duration, {style: {right: 0}, ease: this.props.easeOpen}, 0);
            this.ani.add(() => {
                if(this.props.onOpenEnd && duration) this.props.onOpenEnd(this);
            });
        }
        this.setState({pointerEvents:"auto"});
    }

    close(duration = 0.3){
        if(this.props.onCloseStart) this.props.onCloseStart(this);
        if(this.props.position == CuppaDrawer.LEFT) {
            if(this.ani){
                this.ani.kill();
            }else{
                gsap.set(this.refs.menu, {style: {left: 0}});
                gsap.set(this.refs.blockade, {style: {opacity: 1}});
            }
            gsap.set(this.refs.root, {style: {left: 0}});
            this.ani = gsap.timeline();
            this.ani.to(this.refs.blockade, duration, {style: {opacity: 0}}, 0);
            this.ani.to(this.refs.menu, duration, { style: {left: -this.props.width}, ease: this.props.easeClose}, 0);
            this.ani.set(this.refs.root, {style: {left: 0}});
            this.ani.set(this, {state:{status:CuppaDrawer.CLOSE}});
            this.ani.add(() => {
                BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
                if(this.props.onCloseEnd && duration) this.props.onCloseEnd(this);
            });
        }else{
            if(this.ani){
                this.ani.kill();
            }else{
                gsap.set(this.refs.menu, {style: {right: 0}});
                gsap.set(this.refs.blockade, {style: {opacity: 1}});
            }
            gsap.set(this.refs.root, {style: {right: 0}});
            this.ani = gsap.timeline();
            this.ani.to(this.refs.blockade, duration, {style: {opacity: 0}}, 0);
            this.ani.to(this.refs.menu, duration, { style: {right:-this.props.width}, ease: this.props.easeClose}, 0);
            this.ani.set(this.refs.root, {style: {right: 0}});
            this.ani.set(this, {state:{status:CuppaDrawer.CLOSE}});
            this.ani.add(() => {
                BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
                if(this.props.onCloseEnd && duration) this.props.onCloseEnd(this);
            });
        }
        this.setState({pointerEvents:"none"});
    }

    onBackHandler(){ this.close(); return true; }

    onMove(e, state){
        if(this.props.position == CuppaDrawer.LEFT){
            let posX = state.dx;
            if(posX > 0) posX = 0;
            let percent = 1 - Math.abs(posX/this.props.width);
            this.ani = gsap.set(this.refs.menu, {style:{left:posX}});
            gsap.set(this.refs.blockade, {style:{opacity:percent}});
        }else{
            let posX = state.dx*-1;
            if(posX > 0) posX = 0;
            let percent = 1 - Math.abs(posX/this.props.width);
            this.ani = gsap.set(this.refs.menu, {style:{right:posX}});
            gsap.set(this.refs.blockade, {style:{opacity:percent}});
        }
    }

    onRelease(e, state){
        let [validSwipe, direction] = this.isValidSwipe(state.vx, this.swipeConfig.velocityThreshold, state.dy, this.swipeConfig.directionalOffsetThreshold);
        if(this.props.position == CuppaDrawer.LEFT){
            if(validSwipe){
                if(direction < 0) this.close();
                else this.open();
            }else{
                let percent = Math.abs(state.dx/this.props.width);
                if(percent > 0.5) this.close();
                else this.open();
            }
        }else{
            if(validSwipe){
                if(direction > 0) this.close();
                else this.open();
            }else{
                let percent = Math.abs(state.dx/this.props.width);
                if(percent > 0.5) this.close();
                else this.open();
            }
        }
    }

    isClick(state) {
        let result = Math.abs(state.dx) < this.swipeConfig.gestureIsClickThreshold && Math.abs(state.dy) < this.swipeConfig.gestureIsClickThreshold;
        return result;
    }

    isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
        let result = Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
        return [result, velocity];
    }

    componentWillUnmount() {
        if(this.ani){
            try{ this.ani.stop(); }catch(err){ }
            try{ this.ani.kill(); }catch(err){ }
        };
        gsap.killTweensOf(this.refs.root);
        gsap.killTweensOf(this.refs.blockade);
        gsap.killTweensOf(this.refs.menu);
    }

    render(){
        return(
            <View ref="root" pointerEvents={this.state.pointerEvents} style={[_style.cover, {elevation: 10, overflow:"hidden"}, this.props.styleNavBar]} {...this.panResponder.panHandlers}  >
                <TouchableWithoutFeedback onPress={()=>{ this.close(); }}>
                    <View ref="blockade" style={[_style.blockade]}></View>
                </TouchableWithoutFeedback>
                <View ref="menu" style={[_style.cover, {backgroundColor:"#FFF", maxWidth:this.props.width, width:"100%", right:(this.props.position == CuppaDrawer.LEFT) ? "auto" : 0, left:(this.props.position == CuppaDrawer.RIGHT) ? "auto" : 0, elevation:15}, this.props.style]} >
                    {this.props.content}
                </View>
            </View>
        )
    }
}

export const _style = StyleSheet.create({
    cover:{ position:"absolute", top:0, left:0, right:0, bottom:0, },
    blockade:{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.7)"},
})
