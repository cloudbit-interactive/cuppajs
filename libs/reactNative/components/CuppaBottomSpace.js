import React, {Component} from 'react';
import {StatusBar, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

/* BottomSpace
    Example: <CuppaBottomSpace background={"rgba(0,0,0,0.2)"} />
*/
export class CuppaBottomSpace extends Component {
  static propTypes = {background:PropTypes.string};
  static defaultProps = { background:"rgba(0,0,0,0.5)" };
  constructor(props) {
    super(props);
  }

  static height(){
    let value = StaticSafeAreaInsets.safeAreaInsetsBottom;
    return value;
  }

  render() {
    return (
      <View style={{height:CuppaBottomSpace.height(), width:"100%", backgroundColor:this.props.background}}></View>
    );
  }
}
