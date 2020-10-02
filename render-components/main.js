const React = require('react');

module.exports = React.memo(({components, data}) => {
  let {Container, Title, Rows, AddButton} = components;
  
  return React.createElement(Container, {}, 
    React.createElement(Title), 
    React.createElement(Rows), 
    React.createElement(AddButton)
  );
});