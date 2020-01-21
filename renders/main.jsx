module.exports = ({Container, Title, Rows, AddButton}, props) => {
  return React.createElement(Container, {}, 
    React.createElement(Title), 
    React.createElement(Rows), 
    React.createElement(AddButton)
  );
}