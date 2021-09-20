const React = require('react');

module.exports = class Row extends React.PureComponent {
  constructor(props){
    super(props);
    
    let {rowElement} = this.props;
    
    this.localComponents = {
      Container: React.memo(props => React.createElement('div', props)),
      Element: React.memo(props => React.createElement(rowElement, props)),
      RemoveButton: React.memo(props => React.createElement(props.removeButtonType, {
        className: props.removeButtonClassName,
        onClick: e => props.removeRow(),
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
}
