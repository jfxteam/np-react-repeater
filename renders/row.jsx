const React = require('react');

module.exports = ({Container, Element, RemoveButton}, props) => {
  return React.createElement(Container, {}, 
    React.createElement(Element),
    React.createElement(RemoveButton)
  );
}