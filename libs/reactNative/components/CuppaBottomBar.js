/* 0.0.1 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CuppaBottomSpace} from './CuppaBottomSpace';

export function CuppaBottomBar({children, showBottomSpace = true, style = null, backgroundColor}){
	return (
		<>
			<View style={[CuppaBottomBarStyles.bar, backgroundColor ? {backgroundColor} : null, style]}>
				{children}
			</View>
			{showBottomSpace && <CuppaBottomSpace background={backgroundColor || CuppaBottomBarStyles.bar.backgroundColor} />}
		</>
	)
}

export const CuppaBottomBarStyles = StyleSheet.create({
	bar:{
		backgroundColor:'#4C7DE7',
		minHeight:49,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	button:{minHeight: 49, height:'auto', flex:1, borderRadius:0, flexDirection: 'column', paddingVertical:7},
	text:{fontSize:14, marginTop:3, color:'rgba(255,255,255, 0.5)', textAlign:'center'},
	icon:{width:'100%', height:20, tintColor:'#fff', resizeMode:'contain', opacity:0.5},
	textIcon:{fontSize:10, marginTop:3, color:'#fff', textAlign:'center'},
	textSelected:{ color:'#fff' },
	iconSelected:{ opacity:1 },
});
