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






document.body.innerHTML = '<div id="root"></div>';  

var frame = class extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      data: props.data
    };
  }

  addRow(e){
    this.setState({
      data: this.state.data.concat('')
    });
  }

  removeRow(e, index){
    this.setState({
      data: this.state.data.filter((item, itemIndex) => itemIndex !== index)
    })
  }

  onChange(e, index){
    this.setState({data: Object.values({...this.state.data, ...{[index]: e.target.value}})})
  }
  
  render(){
    var rows = this.state.data.map((value, index) => React.createElement(row, {...{index, value}, ...{removeRow: this.removeRow.bind(this), onChange: this.onChange.bind(this)}})),
      rowsWrapper = React.createElement.apply(null, ['div', {className: 'expandable-rows'}].concat(rows)),
      addBtn = React.createElement('button', {className: 'add-btn', onClick: this.addRow.bind(this)}, 'Добавить');
    return React.createElement('div', {className: 'expandable'}, rows, addBtn);
  }
}

var row = class extends React.Component {
  render(){
    var element = React.createElement('input', {value: this.props.value, name: `person[${this.props.index}]name`, onChange: e => this.props.onChange(e, this.props.index)}),
      removeBtn = React.createElement('button', {className: 'remove-btn', onClick: e => this.props.removeRow(e, this.props.index)}, 'Удалить');
    return React.createElement('div', {className: 'expandable-row'}, element, removeBtn);
  }
}
var component = React.createElement(frame, {data: ['Вася','Петя', 'Коля', 'Маша']});
var el = ReactDOM.render(component, document.getElementById('root'))