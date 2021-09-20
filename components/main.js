const React = require('react');

class Main extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.state = {
      data: this.props.data
    }
    
    this.localComponents = {
      Container: React.memo(props => React.createElement('div', {
        ...{
          ref: this.context.ref
        },
        ...props
      })),
      Title: React.memo(props => React.createElement('h1', {
        ...{
          children: this.props.title
        },
        ...props
      })),
      Rows: React.memo(props => this.state.data.map((data, key) => {
        let {Row} = this.context.dependents,
          {removeButtonText, rowElement} = this.props;
        return React.createElement(Row, {
          key, data, removeButtonText, rowElement,
          onRowRemove: e => {
            this.removeRow(key);
          }
        });
      })),
      AddButton: React.memo(props => React.createElement('button', {
        ...{
          onClick: this.addRow.bind(this),
          children: this.props.addButtonText
        },
        ...props
      }))
    }
  }
  
  render(){
    return React.createElement(this.context.component, {
      components: this.localComponents,
      data: this.props
    });
  }
  
  addRow(triggerEvents = true){
    let {onRowAdd} = this.props, event;
    
    this.state.data = this.state.data.concat(this.emptyDataValue);
    this.setState(this.state, () => {
      if(triggerEvents){
        event = this.context.trigger('rowAdd', this.state.data);
        if(typeof(onRowAdd) === 'function' && !event.defaultPrevented)
          onRowAdd(event);
      }
    });
  }

  removeRow(index, triggerEvents = true){
    let {onRowRemove} = this.props, event;
    
    this.state.data.splice(index, 1);
    this.setState(this.state, () => {
      if(triggerEvents){
        event = this.context.trigger('rowRemove', this.state.data);
        if(typeof(onRowRemove) === 'function' && !event.defaultPrevented)
          onRowRemove(event);
      }
    });
  }
  
  get emptyDataValue(){
    switch(typeof(this.state.data[0])){
      case 'object': return {value: ''}
      case 'string': return ''
    }
  }
}

module.exports = Main;
