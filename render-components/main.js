const React = require('react');

module.exports = React.memo(({components, props}) => {
  let {Container, Title, Rows, AddButton} = components,
    {title, data, addButtonType, addButtonClassName, addButtonText, removeButtonType, removeButtonClassName, removeButtonText, rowClassName, rowElement, rowElementProps} = props;
  
  return React.createElement(Container, {},
    React.createElement(Title, {}, title),
    React.createElement(Rows, {data, removeButtonType, removeButtonClassName, removeButtonText, rowClassName, rowElement, rowElementProps}),
    React.createElement(AddButton, {addButtonType, addButtonClassName}, addButtonText)
  );
});
