const React = require('react');

module.exports = class Row extends React.PureComponent {
  constructor(props){
    super(props);
    
    let {removeButtonText, onRowRemove, rowElement, data} = this.props;
  
    onRowRemove = onRowRemove.bind(this);
    
    this.localComponents = {
      Container: React.memo(props => React.createElement('div', props)),
      Element: React.memo(props => React.createElement(rowElement, {
        ...data,
        ...props
      })),
      RemoveButton: React.memo(props => React.createElement('button', {
        ...{
          onClick: onRowRemove,
          children: removeButtonText
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
}