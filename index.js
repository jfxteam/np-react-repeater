'use strict';

const React = require('react');
const EventsHandler = require('@jfxteam/dom-events-handler');

const Components = require.context('./components', false, /\.js$/);
const Defaults = require('./defaults.js');

const Main = Components('./main.js');
const Row = Components('./row.js');

class ReactRepeater extends React.PureComponent {
  constructor(props){
    super(props); 
    
    this.ref = React.createRef();
    
    this.eventsHandler = new EventsHandler;
      
    let components = {...this.constructor.defaultProps.components, ...this.props.components},
      trigger = this.eventsHandler.trigger.bind(this.eventsHandler);
    
    Main.contextType = React.createContext({
      ref: this.ref,
      dependents: {Row},
      component: components.main,
      trigger
    });
    
    Row.contextType = React.createContext({
      component: components.row,
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