const React = require('react');
const DefaultRenders = require.context('./renders', false, /\.jsx$/);

module.exports = {
  options: {
  	element: props => React.createElement('input', props),
    data: [{value: 'Заполненное поле'}],
    addButtonText: 'Добавить',
    removeButtonText: 'Удалить',
  	onRowAdd: null,
    onRowRemove: null,
  },
  renders: {
    main: defaultRenders('./main.jsx'),
    row: defaultRenders('./row.jsx'),
  }
}