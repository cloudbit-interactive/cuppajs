/* CuppaPortal
    <CuppaPortal ref={ ref =>{ if(!ref) return; Global.mainPortal = ref } } />

    Globals.mainPortal.add('myElement', <Text>Hello</Text>);
    Globals.mainPortal.remove('myElement');
    Globals.mainPortal.get('myElement');
    Globals.mainPortal.getRef('myElement');
    Globals.mainPortal.removeAll();
*/
import {Component} from "react";

export class CuppaPortal extends Component{
	static defaultProps = { }

	constructor(props) {
		super(props);
		this.state = {elements:{}, references:{} };
	}

	async add(name, element, callback){
		let result = await new Promise( resolve =>{
			if(!name) name = "modal";
			let elements = this.state.elements;
			elements[name] = element;
			this.setState({elements:elements}, ()=>{
				if(callback) callback(true);
				resolve(true);
			});
		});
		return result;
	}

	async replace(name, element, callback){
    let result = await new Promise( resolve =>{
      if(!name) name = "modal";
      let elements = this.state.elements;
      elements[name] = null;
      this.setState({elements:elements}, ()=>{
        let elements = this.state.elements;
        elements[name] = element;
        this.setState({elements:elements}, ()=>{
          if(callback) callback(true);
          resolve(true);
        });
      });
    });
    return result;
  }

	async remove(name, callback){
		let result = await new Promise( resolve =>{
			if(!name) name = "modal";
			let elements = this.state.elements;
			delete elements[name];
			delete this.state.references[name];
			this.setState({elements:elements}, ()=>{
				if(callback) callback(true);
				resolve(true);
			});
		});
		return result;
	}

	/* if you rename and don't remove it immediately the new instance should have a different key
			Example:
			await Global.mainPortal.rename("Item", "ItemToRemove");
			Global.mainPortal.add("Item", <Item key={cuppa.UUID()} />);
			Global.mainPortal.remove("ItemToRemove");
	* */
	async rename(name, newName, callback){
		let result = await new Promise( resolve =>{
			let elements = this.state.elements;
			elements[newName] = elements[name];
			delete elements[name];
			this.setState({elements:elements}, ()=>{
				if(callback) callback(true);
				resolve(true);
			});
		} );
		return result;
	}

	removeSelected(name, callback){
		if(!name) name = ["modal"];
		let elements = this.state.elements;
		name.map(data => { delete elements[data]; });
		this.setState({elements:elements}, callback);
		name.map(data => { delete this.state.references[data]; });
	}

	get(name){
		if(!name) name = "modal";
		return this.state.elements[name];
	}

	addRef(name, ref){
		if(!name) name = "modal";
		this.state.references[name] = ref;
	}

	getRef(name){
		if(!name) name = "modal";
		return this.state.references[name];
	}

	removeAll(callback){
		this.setState({references:{}});
		this.setState({elements:{}}, callback);
	}

	render(){
		let elements = [];
		for (let name in this.state.elements) {
			elements.push(this.state.elements[name]);
		}
		return elements;
	}
}
