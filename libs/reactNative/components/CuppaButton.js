/* 0.0.1 */
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export function CuppaButton({text = '', background = '#4C7DE7', backgroundPress = '#3561bd', disabled = false, disableOpacity = 0.5, onPress = null, onPressIn = null, onPressOut = null, onLongPress = null, style = null, textStyle = null, children} = {}){
	const [_bg, setBg] = useState(background);

	return (
		<Pressable
			disabled={disabled}
			onPressIn={(e)=>{ setBg(backgroundPress); if(onPressIn){onPressIn(e);} }}
			onPressOut={(e)=>{ setBg(background); if(onPressOut){onPressOut(e);} }}
			onPress={(e)=>{ if(onPress){onPress(e);} }}
			onLongPress={onLongPress}
      style={[CuppaButtonStyles.button, {backgroundColor: _bg, opacity:disabled ? disableOpacity : 1}, style]}
		>
			{!text ? null : <Text style={[CuppaButtonStyles.text, textStyle]}>{text}</Text>}
			{children}
		</Pressable>
	);
}

export const CuppaButtonStyles = StyleSheet.create({
	button:{
		paddingHorizontal:10,
		borderRadius:5,
		height:43,
		minWidth:60,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		gap:10,
	},
	buttonIcon:{ width:43, height:43, minWidth:0, justifyContent:'center', alignItems:'center', borderRadius:5 },
	buttonCircle:{ position:'absolute', right:0, bottom:0, borderRadius:60, width: 60, height:60, minWidth:0},
	icon:{width:26, height:26, tintColor:'#fff', resizeMode:'contain' },
	text:{color:'#FFF', fontSize:14},
});
