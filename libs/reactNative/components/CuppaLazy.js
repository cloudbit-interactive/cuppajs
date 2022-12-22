import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {cuppa} from '../../cuppa';

/* Cuppa lazy
    Example:
        <CuppaLazy component={<Section1 />} mount={(this.state.section == "section1")} />
        <CuppaLazy component={<Section2 />} mount={(this.state.section == "section2")} />
* */
export class CuppaLazy extends Component{
	static propTypes = { component:PropTypes.any, style:PropTypes.object, mount:PropTypes.bool }
	static defaultProps = { component:null, style:{flex:1}, mount:false }
	state = { component:null }

	constructor(props){
		super(props); cuppa.bindAll(this);
	}

	componentDidMount(){
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.mount && !this.state.component) this.setState({component:this.props.component});
	}

	render(){
		return (
			<View style={[{display:(this.props.mount) ? "flex" : "none"}, this.props.style]}>
				{ this.state.component }
			</View>
		);
	}
}
