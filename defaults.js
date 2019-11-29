module.exports = {
	container: document.body,
	element: ({...data}) => {},
	classList: [],
	dataFiller: null,
	onChange: () => {},
	controlAdd: {
		text: 'Добавить',
		className: '',
		click: null,
		attributes: null,
		renderBefore: null,
		renderAfter: null,
		actionBefore: () => {},
		actionAfter: () => {},
		preventDefault: false
	},
	controlRemove: {
		text: 'Удалить',
		className: '',
		click: null,
		attributes: null,
		renderBefore: null,
		renderAfter: null,
		confirm: () => true,
		actionBefore: () => {},
		actionAfter: () => {},
		preventDefault: false
	}
}