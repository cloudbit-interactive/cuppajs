/* 0.0.1 */
import { Animated, Dimensions, Easing } from "react-native";
import {gsap, Power0, Power2, Expo} from 'gsap-rn';

export class CuppaAnimations {
	static directions = {UP:'UP', DOWN:'DOWN', LEFT:'LEFT', RIGHT:'RIGHT'}
	/* Default animations
    show> this.ani = cuppa.slideShow({ref:this.refs.main, direction:"up"});
    hide> this.ani = cuppa.slideHide({ref:this.ani.ref, tween:this.ani.tween, direction:"down", callback:()=>{ } });
 */
	static slideShow = function({ref = null, blockade = null, direction = CuppaAnimations.directions.UP, duration = 0.3, delay = 0.2, ease = Power2.easeOut, callback = null} = {}){
		if(!ref) return;
		if(ref.tween) ref.tween.kill();
		const dim = Dimensions.get('window');
		let tween = gsap.timeline({onComplete:callback});
			// set
			tween.set(ref, {style:{opacity:1}} );
			if(direction === CuppaAnimations.directions.UP) tween.set(ref, {transform:{y:dim.height, x:0}} );
			if(direction === CuppaAnimations.directions.DOWN) tween.set(ref, {transform:{y:-dim.height, x:0}} );
			if(direction === CuppaAnimations.directions.LEFT) tween.set(ref, {transform:{x:dim.width, y:0}} );
			if(direction === CuppaAnimations.directions.RIGHT) tween.set(ref, {transform:{x:-dim.width, y:0}} );
			if(blockade) tween.set(blockade, {style:{opacity:0}});
			// animation
			tween.to(ref, {duration, transform: {y:0, x:0}, ease, delay}, 0);
			if(blockade) tween.to(blockade, {duration, style:{opacity: 1}, ease:Power0.easeInOut, delay}, 0);
		ref.tween = tween;
		return tween;
	}

	static slideShowNative({params = null, direction = CuppaAnimations.directions.UP, duration = 400, delay = 0, callback = null} = {}){
		const dim = Dimensions.get('window');
		if(params.opacity) params.opacity.setValue(0);
		if(direction === CuppaAnimations.directions.UP && params.y){
			params.y.setValue(dim.height);
		}else if(direction === CuppaAnimations.directions.DOWN && params.y){
			params.y.setValue(-dim.height);
		}else if(direction === CuppaAnimations.directions.LEFT && params.x){
			params.x.setValue(dim.width);
		}else if(direction === CuppaAnimations.directions.RIGHT && params.x){
			params.x.setValue(-dim.width);
		}
		Animated.sequence([
			Animated.parallel([
				(params.opacity) ? Animated.timing(params.opacity, { toValue: 1, duration:200, delay, useNativeDriver: true}) : null,
				(params.x) ? Animated.timing(params.x, { toValue: 0, duration, delay, useNativeDriver: true, easing:Easing.out(Easing.exp)}) : null,
				(params.y) ? Animated.timing(params.y, { toValue: 0, duration, delay, useNativeDriver: true, easing:Easing.out(Easing.exp)}) : null,
			])
		]).start(callback);
	}

	static slideHide({ref = null, blockade = null, direction = CuppaAnimations.directions.DOWN, duration = 0.3, delay = 0, ease = Power2.easeIn, callback = null} = {}){
		if(!ref) return;
		if(ref.tween) ref.tween.kill();
		const dim = Dimensions.get('window');
		let tween = gsap.timeline({onComplete:callback});
			// set
			if(blockade) tween.set(blockade, {style:{opacity:1}});
			tween.set(ref, {transform:{x:0, y:0}});
			// animation
			if(direction === CuppaAnimations.directions.UP) tween.to(ref, {duration, transform: {y:-dim.height, x:0}, delay, ease}, 0);
			else if(direction === CuppaAnimations.directions.DOWN) tween.to(ref, {duration, transform: {y:dim.height, x:0}, delay, ease}, 0);
			else if(direction === CuppaAnimations.directions.LEFT) tween.to(ref, {duration, transform: {x:-dim.height, y:0}, delay, ease}, 0);
			else if(direction === CuppaAnimations.directions.RIGHT) tween.to(ref, {duration, transform: {x:dim.width, y:0}, delay, ease}, 0);
			if(blockade) tween.to(blockade, {duration, style:{opacity:0}, ease:Power0.easeInOut }, 0.2);
		ref.tween = tween;
		return tween;
	}

	static slideHideNative({params = null, direction = CuppaAnimations.directions.DOWN, duration = 300, delay = 0, callback = null} = {}){
		const dim = Dimensions.get('window');
		let xEnd = 0;
		let yEnd = 0;
		if(direction === CuppaAnimations.directions.UP && params.y){
			yEnd = -dim.height;
		}else if(direction === CuppaAnimations.directions.DOWN && params.y){
			yEnd = dim.height;
		}else if(direction === CuppaAnimations.directions.LEFT && params.x){
			xEnd = -dim.width;
		}else if(direction === CuppaAnimations.directions.RIGHT && params.x){
			xEnd = dim.width;
		}
		Animated.sequence([
			Animated.parallel([
				(params.opacity) ? Animated.timing(params.opacity, { toValue: 0, duration:200, delay:200, useNativeDriver: true}) : null,
				(params.x) ? Animated.timing(params.x, { toValue: xEnd, duration, delay, useNativeDriver: true, easing:Easing.in(Easing.exp)}) : null,
				(params.y) ? Animated.timing(params.y, { toValue: yEnd, duration, delay, useNativeDriver: true, easing:Easing.in(Easing.exp)}) : null,
			])
		]).start(callback);
	}

	static popShow = function({ref = null, blockade = null, duration = 0.25, delay = 0.2, scale = 0.8, ease = Power2.easeOut, callback = null} = {}){
		if(!ref) return;
		if(ref.tween) ref.tween.kill();
		let tween = gsap.timeline({onComplete:callback});
			// set
			tween.set(ref, { transform:{scale:scale}, style:{opacity:0 } });
			if(blockade) tween.set(blockade, {style:{opacity:0}});
			// animation
			tween.to(ref, {duration, transform:{scale:1}, style:{opacity:1}, ease, delay}, 0);
			if(blockade) tween.to(blockade, {duration, style:{opacity: 1}, ease, delay}, 0);
		ref.tween = tween;
		return tween;
	}

	static popHide = function({ref = null, blockade = null, duration = 0.25, delay = 0, scale = 0.8, ease = Expo.easeIn, callback = null} = {}){
		if(!ref) return;
		if(ref.tween) ref.tween.kill();
		let tween = gsap.timeline({onComplete:callback});
			// set
			if(!ref.tween) tween.set(ref,  {transform:{scale:1}, style:{opacity:1}});
			if(blockade) tween.set(blockade, {style:{opacity:1}});
			// animation
			tween.to(ref, {duration, style:{opacity:0}, transform:{scale}, delay, ease}, 0 );
			if(blockade) tween.to(blockade, { duration, style:{opacity:0}, delay, ease:Power0.easeInOut } );
		ref.tween = tween;
		return tween;
	}
}
