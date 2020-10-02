const React = require('react');

module.exports = React.memo(({components, data}) => {
  let {Container, Element, RemoveButton} = components;
  
  return React.createElement(Container, {}, 
    React.createElement(Element),
    React.createElement(RemoveButton)
  );
});