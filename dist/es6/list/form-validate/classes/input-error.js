export class InputError {
    constructor(input, insertElement = input, insertPosition = 'afterend') {
        this.input = input;
        this.insertElement = insertElement;
        this.insertPosition = insertPosition;
        this.create();
    }
    get errorElement() {
        return this._errorElement;
    }
    set message(text) {
        this._errorElement.innerHTML = text;
    }
    create() {
        if (!this.input.parentElement) {
            return;
        }
        this._errorElement = this.input.parentElement.querySelector(`[error-for="${this.input.name}"]`);
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
//# sourceMappingURL=input-error.js.map