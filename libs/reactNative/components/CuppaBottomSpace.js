/* 0.0.1
    Example: <CuppaBottomSpace background={"rgba(0,0,0,0.2)"} />
*/
import React, {Component} from 'react';
import {View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

/**
 * @typedef {Object} CuppaBottomSpace
 * @property {string} background
 */
/**
 * @extends {Component<CuppaBottomSpace>}
 */
export class CuppaBottomSpace extends Component {
  static defaultProps = {background: 'rgba(0,0,0,0.5)'};

  constructor(props) {
    super(props);
  }

  static height() {
    return StaticSafeAreaInsets.safeAreaInsetsBottom;
  }

  render() {
    return (
      <View
        style={{
          height: CuppaBottomSpace.height(),
          width: '100%',
          backgroundColor: this.props.background,
        }}
      />
    );
  }
}
