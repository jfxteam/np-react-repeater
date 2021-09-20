const React = require('react');

module.exports = React.memo(({components, props}) => {
  let {Container, Element, RemoveButton} = components,
    {index, data, rowClassName, rowElementProps, removeRow, removeButtonType, removeButtonClassName, removeButtonText} = props;
  
  return React.createElement(Container, {className: rowClassName},
    React.createElement(Element, {...rowElementProps, ...{data, index}}),
    React.createElement(RemoveButton, {removeRow, removeButtonType, removeButtonClassName}, removeButtonText)
  );
});
