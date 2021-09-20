const React = require('react');

class Main extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.state = {
      data: this.props.data
    }
    
    this.localComponents = {
      Container: React.memo(props => React.createElement('div', {
        ref: this.context.ref,
        children: props.children
      })),
      Title: React.memo(props => React.createElement('h1', {
        children: props.children
      })),
      Rows: React.memo(props => {
        let realIndex = 0;
        return props.data.map((data, key) => {
          let {Row} = this.context.dependents,
            {removeButtonType, removeButtonClassName, removeButtonText, rowClassName, rowElement, rowElementProps} = props;
          
          return React.createElement(Row, {
            key,
            _key: key,
            index: realIndex++,
            data,
            removeButtonType,
            removeButtonClassName,
            removeButtonText,
            rowClassName,
            rowElement,
            rowElementProps,
            removeRow: () => {
              this.removeRow(key);
            }
          });
        })
      }),
      AddButton: React.memo(props => React.createElement(props.addButtonType, {
        className: props.addButtonClassName,
        onClick: e => this.addRow(),
        children: props.children
      }))
    }
  }
  
  render(){
    return React.createElement(this.context.component, {
      components: this.localComponents,
      props: {...this.props, ...this.state}
    });
  }
  
  addRow(triggerEvents = true){
    let {onRowAdd} = this.props, event;
    
    let data = this.state.data.concat(null);
    this.setState({...this.state, ...{data}}, () => {
      if(triggerEvents){
        event = this.context.trigger('rowAdd', this.state.data);
        if(typeof(onRowAdd) === 'function' && !event.defaultPrevented)
          onRowAdd(event);
      }
    });
  }
  
  removeRow(index, triggerEvents = true){
    let {onRowRemove} = this.props, event;
    
    let data = [].concat(this.state.data);
    delete data[index];
    
    this.setState({...this.state, ...{data}}, () => {
      if(triggerEvents){
        event = this.context.trigger('rowRemove', this.state.data);
        if(typeof(onRowRemove) === 'function' && !event.defaultPrevented)
          onRowRemove(event);
      }
    });
  }
}

module.exports = Main;
