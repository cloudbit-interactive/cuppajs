/* 0.0.1 */
import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {CuppaStatusBar} from './CuppaStatusBar';
import {CuppaButton} from './CuppaButton';

export function CuppaHeaderBar({children = null, title = '', showTitle = true, color = 'light-content', backCallback = null, styles = null, showStatusBar = true}){
	return (
		<>
			{showStatusBar && <CuppaStatusBar color={color} background={CuppaHeaderBarStyles.bar.backgroundColor} />}
			<View style={[CuppaHeaderBarStyles.bar, styles]}>
				{backCallback &&
					<CuppaButton
						onPress={backCallback}
						style={[CuppaHeaderBarStyles.btn]}
						background={'rgba(0,0,0,0)'}
						backgroundPress={'rgba(0,0,0,0.2)'}
					>
						<Image
							source={require('../media/images/back.png')}
							style={[CuppaHeaderBarStyles.icon]}
							fadeDuration={0}
						/>
					</CuppaButton>
				}
				{showTitle ? <Text style={CuppaHeaderBarStyles.title}>{title}</Text> : null}
				{children}
			</View>
		</>
	);
}

export const CuppaHeaderBarStyles = StyleSheet.create({
	bar:{
		backgroundColor:'#4C7DE7',
		minHeight:43,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	btn:{minHeight: 43, width:43, minWidth:0, borderRadius:0, paddingHorizontal:10, justifyContent:'center', alignItems:'center', flexDirection:'row'},
	icon:{height:18, width:'100%', tintColor:'#fff', resizeMode:'contain'},
	title:{paddingHorizontal:10, fontSize:20, fontWeight:'bold', color:'#FFF', flex:1},
	btnText:{color:'#FFF'},
});
