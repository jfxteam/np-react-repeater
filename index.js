'use strict';

const React = require('react');
const EventsHandler = require('wf-events-handler');

const Components = require.context('./components', false, /\.js$/);
const Defaults = require('./defaults.js');

const Main = Components('./main.js');
const Row = Components('./row.js');

class ReactRepeater extends React.Component {
  constructor(props){
    super(props); 
    
    this.ref = React.createRef();
    
    this.eventsHandler = new EventsHandler;
      
    let renders = {...this.constructor.defaultProps.renders, ...this.props.renders},
      trigger = this.eventsHandler.trigger.bind(this.eventsHandler);
    
    Main.contextType = React.createContext({
      ref: this.ref,
      dependents: {Row},
      render: renders.main,
      trigger
    });
    
    Row.contextType = React.createContext({
      render: renders.row,
      trigger
    });
  }
  
  componentDidMount(){
    this.eventsHandler.setElement(this.ref.current);
    ['on', 'off'].map(key => Object.defineProperty(this, key, {value: this.eventsHandler[key].bind(this.eventsHandler)}));
  }
  
  render(){
    let options = {...this.constructor.defaultProps.options, ...this.props.options};
    return React.createElement(Main, options);
  }
}

ReactRepeater.defaultProps = Defaults;

module.exports = ReactRepeater;











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