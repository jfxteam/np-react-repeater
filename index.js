const JFactory = require('jfactory');

const config = require('./config.js');
const defaults = require('./defaults.js');
const elements = require('./elements.js');

module.exports = class Expandable extends JFactory.Module {
	constructor(options){
		super({config, defaults, elements, options});
		
		this.init();
	}
	
	init(){
		let values = this.options.dataFiller || this.defaults.dataFiller;
		if(values)
			this.fill(values);
	}
	
	fill(values){
		//this.createElement('rows');
		values.map(data => {
			if(data)
				this.add(data);
		});
		
		return this;
	}
	
	add(data){
		let element = this.options.element.call(this, data),
			$element = this.createElement(element, {
				parent: 'rows',
				wrapper: this.getTemplate('row'),
				renderMethod: 'append',
			}),
			$controlRemove = this.createElement('controlRemove', {
				parent: $element.$wrapper.context,
				renderMethod: 'append',
			});
		$controlRemove.target = $element;
		return $element;
	}
	
	remove($element){
		$element.$wrapper.context.remove();
		return $element;
	}
}