const React = require('react');

module.exports = class Row extends React.Component {
  constructor(props){
    super(props);
    
    this.localComponents = {
      Element: props => React.createElement(this.props.element, {
        ...this.props.data,
        ...props
      }),
      RemoveButton: props => React.createElement('button', {
        ...{
          onClick: this.props.onRowRemove.bind(this),
          children: this.props.removeButtonText
        },
        ...props
      })
    }
  }
  
  render(){
    return this.context.render(this.localComponents, this.props);
  }
}