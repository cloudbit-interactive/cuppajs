import {AppState} from 'react-native';
import {Component} from 'react';
import PropTypes from 'prop-types';

export class CuppaAppState extends Component{
	static propTypes = {callback:PropTypes.func};
	static defaultProps = {callback:null};
	subscription;

	constructor(props) {
		super(); bindAll(this);
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

function bindAll(element, isFunction){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	if(isFunction)  propertyNames = Object.keys(element);
	for(let i = 0; i < propertyNames.length; i++){
		if(typeof element[propertyNames[i]] == "function"){
			element[propertyNames[i]]= element[propertyNames[i]].bind(element);
		};
	};
};
