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