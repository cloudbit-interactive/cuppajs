/* 0.0.2 */
import {Component} from 'react';
import {BackHandler} from 'react-native';

export class CuppaBack extends Component{
  static defaultProps = {callback:null, closeApp:false};
  subscription;

  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount(){
    this.subscription = BackHandler.addEventListener('hardwareBackPress', this.onHandler);
  }

  onHandler = function(){
    if(this.props.callback) this.props.callback();
    if(!this.props.closeApp){
      return true;
    }else{
      return false;
    }
  }.bind(this);

  componentWillUnmount(){
    if(this.subscription) this.subscription.remove();
  }

  render(){ return null }
}
