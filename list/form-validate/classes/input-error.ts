/**
 * @module FormValidateBehavior
 */

export class InputError {
	protected _errorElement: HTMLElement;

	get errorElement(): HTMLElement {
		return this._errorElement;
	}

	set message(text: string) {
		this._errorElement.innerHTML = text;
	}

	constructor(public readonly input: HTMLInputElement, public insertElement: HTMLElement = input, public insertPosition: InsertPosition = 'afterend') {
		this.create();
	}

	protected create() {
		if (!this.input.parentElement) {
			return;
		}

		this._errorElement = this.input.parentElement.querySelector(`[error-for="${this.input.name}"]`) as HTMLElement;

		if (!this._errorElement) {
			let node = document.createElement('DIV');
			node.classList.add('error-message');
			node.setAttribute('error-for', this.input.name);
			node.setAttribute('aria-live', 'polite');

			this._errorElement = this.input.parentElement.insertBefore(node, this.input.nextSibling);
			this.insertElement.insertAdjacentElement(this.insertPosition, this._errorElement);
		}
	}

	clear() {
		this._errorElement.innerHTML = '';
	}

}