module.exports = ({Element, RemoveButton}, props) => {
  return React.createElement(Element, {}, 
    React.createElement(RemoveButton)
  );
}