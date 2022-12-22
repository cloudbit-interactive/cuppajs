import {AppState} from 'react-native';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {cuppa} from '../../cuppa';

export class CuppaAppState extends Component{
	static propTypes = {callback:PropTypes.func};
	static defaultProps = {callback:null};
	subscription;

	constructor(props) {
		super(); cuppa.bindAll(this);
	}

	componentDidMount(){
		this.subscription = AppState.addEventListener("change", this.onChange);
	}

	onChange(nextAppState){
		if(this.props.callback) this.props.callback(nextAppState);
	}

	componentWillUnmount() {
		if(this.subscription) this.subscription.remove();
	}

	render() {
		return null;
	}
}
