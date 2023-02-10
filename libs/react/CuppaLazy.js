import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* Cuppa lazy
    Example:
        <CuppaLazy component={<Section1 />} mount={(this.state.section == "section1")} />
        <CuppaLazy component={<Section2 />} mount={(this.state.section == "section2")} />
* */
export class CuppaLazy extends Component{
	static propTypes = { component:PropTypes.any, style:PropTypes.object, mount:PropTypes.bool, display:PropTypes.string  }
	static defaultProps = { component:null, style:{flex:1}, mount:false, display:'block' }
	state = { component:null }

	constructor(props){
		super(props); bindAll(this);
	}

	componentDidMount(){
		this.componentDidUpdate();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.mount && !this.state.component){
			let component;
			if(typeof this.props.component.type === 'function'){
				component = React.cloneElement(this.props.component, {cuppaActionSheet:this });
			}else{
				component = React.cloneElement(this.props.component, {cuppaActionSheet:this, ref:(ref)=>{ if(ref) this.ref = ref; }});
			}
			this.setState({component});
		}else if(this.props.mount && this.ref?.lazyMount){
			this.ref.lazyMount(this.ref);
		}else if(!this.props.mount && this.ref?.lazyUnmount){
			this.ref.lazyUnmount(this.ref);
		}
	}

	render(){
		return (
			<div style={{...{display:(this.props.mount) ? this.props.display : "none"}, ...this.props.style}}>
				{ this.state.component }
			</div>
		);
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
