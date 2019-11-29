module.exports = function(){
	let self = this;
	return {
		wrapper: {
			classList: ['expandable-container'].concat(this.options.classList),
			parent: this.options.container,
			renderMethod: 'append'
		},
		rows: {
			classList: ['expandable__rows'],
			parent: 'wrapper',
			renderMethod: 'append'
		},
		controlAdd: {
			classList: ['expandable__control-add', this.options.controlAdd.className],
			content: this.options.controlAdd.text,
			tagName: 'button',
			parent: 'wrapper',
			renderMethod: 'append',
			attributes: this.options.controlAdd.attributes,
			renderBefore: (...args) => {
				if(typeof(this.options.controlAdd.renderBefore) === 'function')
					this.options.controlAdd.renderBefore.apply(this, args);
			},
			renderAfter: (...args) => {
				if(typeof(this.options.controlAdd.renderAfter) === 'function')
					this.options.controlAdd.renderAfter.apply(this, args);
			},
			events: {
				click: e => {
					e.preventDefault();
					let controlAddSettings = this.options.controlAdd, $row;
					controlAddSettings.actionBefore.call(this);
					if(!controlAddSettings.preventDefault)
						$row = this.add();
					controlAddSettings.actionAfter.call(this, $row);
				}
			}
		},
		controlRemove: () => ({
			classList: ['expandable__control-remove', this.options.controlRemove.className],
			content: this.options.controlRemove.text,
			attributes: this.options.controlRemove.attributes,
			renderBefore: (...args) => {
				if(typeof(this.options.controlRemove.renderBefore) === 'function')
					this.options.controlRemove.renderBefore.apply(this, args);
			},
			renderAfter: (...args) => {
				if(typeof(this.options.controlRemove.renderAfter) === 'function')
					this.options.controlRemove.renderAfter.apply(this, args);
			},
			tagName: 'button',
			events: {
				click(e){
					e.preventDefault();
					let controlRemoveSettings = self.options.controlRemove,
						$element = this.target;
					if(controlRemoveSettings.confirm.call(self, $element)){
						controlRemoveSettings.actionBefore.call(self, $element);
						if(!controlRemoveSettings.preventDefault)
							self.remove($element);
						controlRemoveSettings.actionAfter.call(self, $element);
					}
				}
			}
		}),
	}
}