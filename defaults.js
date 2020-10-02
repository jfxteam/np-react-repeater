const React = require('react');

const renderComponents = require.context('./render-components', false, /\.js$/);

module.exports = {
  options: {
    rowElement: props => React.createElement('input', {
      ...{
        onChange: e => {}
      },
      ...props
    }),
    data: [{value: 'Заполненное поле'}],
    addButtonText: 'Добавить',
    removeButtonText: 'Удалить',
    onRowAdd: null,
    onRowRemove: null,
  },
  renders: {
    main: DefaultRenders('./main.jsx'),
    row: DefaultRenders('./row.jsx'),
  }
}