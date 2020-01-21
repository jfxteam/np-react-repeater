const React = require('react');

module.exports = class Main extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      data: this.props.data
    }
    
    this.localComponents = {
      Container: props => React.createElement('div', {
        ...{
          ref: this.context.ref
        },
        ...props
      }),
      Title: props => React.createElement('h1', {
        ...{
          children: this.props.title
        },
        ...props
      }),
      Rows: props => this.state.data.map(key => {
        let {Row} = this.context.dependents;
        return React.createElement(Row, {
          key,
          element: this.props.element,
          data: this.state.data[key],
          onRowRemove: e => {
            this.removeRow(key);
          }
        })
      }),
      AddButton: props => React.createElement('button', {
        ...{
          onClick: this.addRow.bind(this),
          children: this.props.addButtonText
        },
        ...props
      })
    }
  }
  
  render(){
    return this.context.render(this.localComponents, this.props);
  }
  
  addRow(triggerEvents = true){
    let {onRowAdd} = this.props, event;
    
    this.state.data.concat(this.emptyDataValue);
    this.setState(this.state);
    if(triggerEvents){
      event = this.context.trigger('rowAdd', this.state.data);
      if(typeof(onRowAdd) === 'function' && !event.defaultPrevented)
        onRowAdd(event);
    }
  }

  removeRow(index, triggerEvents = true){
    let {onRowRemove} = this.props, event;
    
    this.state.data.splice(index, 1);
    this.setState(this.state);
    if(triggerEvents){
      event = this.context.trigger('rowRemove', this.state.data);
      if(typeof(onRowRemove) === 'function' && !event.defaultPrevented)
        onRowRemove(event);
    }
  }
  
  get emptyDataValue(){
    switch(typeof(this.state.data[0])){
      case 'object': return {}
      case 'string': return ''
    }
  }
}