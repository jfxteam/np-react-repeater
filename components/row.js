const React = require('react');

module.exports = class Row extends React.Component {
  constructor(props){
    super(props);
    
    let {removeButtonText, onRowRemove, rowElement, data, index} = this.props;
    
    this.localComponents = {
      Container: props => React.createElement('div', props),
      Element: props => React.createElement(rowElement, {
        ...this.props.data,
        ...props
      }),
      RemoveButton: props => React.createElement('button', {
        ...{
          onClick: onRowRemove.bind(this),
          children: removeButtonText
        },
        ...props
      })
    }
  }
  
  render(){
    return this.context.render(this.localComponents, this.props);
  }
}