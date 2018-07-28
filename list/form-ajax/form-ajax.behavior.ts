/**
 * @module FormAjaxBehavior
 */

import { Behavior } from "../../src/classes/behavior";
import { FormAjaxOptions } from "./form-ajax.options";
import { Http } from "./classes/http";

export class FormAjaxBehavior extends Behavior {
	public static behaviorName = "form-ajax";

	
	protected defaultOptions: FormAjaxOptions = {
		messageFailure: undefined,
		messageSuccess: undefined
	};
	public options: FormAjaxOptions;
	
	protected ajaxBox: HTMLElement;

	public init(): void {
		if (this.element.nodeName != 'FORM') {
			console.warn('FormBehavior: element should be form, skip. ', this.element);
			return;
		}

		this.build();
		this.eventsHandler();
	}

	public build() {
		this.element.insertAdjacentHTML('afterend', `
			<div class="ajax-box"></div>
		`);

		this.ajaxBox = this.element.nextElementSibling as HTMLElement;
	}

	public clearForm() {
		const inputs = this.element.querySelectorAll('input:not([type="submit"]), textarea');

		for (let i = 0; i < inputs.length; i++) {
			(<HTMLInputElement>inputs[i]).value = '';
		}
	}

	protected eventsHandler() {
		this.element.addEventListener('submit', async (e) => {
			e.preventDefault();

			this.sendForm();

		});
	}

	public async sendForm() {
		if (!(<HTMLFormElement>this.element).checkValidity()) {
			return;
		}

		let form = this.element as HTMLFormElement;
		const action = this.element.getAttribute('action');

		if (!action) {
			console.warn('Action attribute undefined.', this.element);
			return;
		}

		this.onSend();
		try {
			const req = await Http.post(action, {
				form: form,
				headers: {
					"Accept": "application/json, text/plain, */*"
				}
			});
			
			this.clearForm();
			this.onSuccess(req);

		} catch (err) {
			console.warn('Request error.', this.element, err);
			this.onFailure(err);
		}
	}

	public onSuccess(req: XMLHttpRequest) {
		this.ajaxBox.classList.add('ajax-box--sent');
		let responseText = this.options.messageSuccess ? this.options.messageSuccess : req.responseText;

		this.ajaxBox.innerHTML = '<p>' + responseText + '</p>';
	}

	public onFailure(req: XMLHttpRequest) {
		this.ajaxBox.classList.add('ajax-box--error');
		let responseText = this.options.messageFailure ? this.options.messageFailure : req.responseText;

		this.ajaxBox.innerHTML = '<p>' + responseText + '</p>';
	}

	public onSend() {
		this.ajaxBox.classList.add('ajax-box--pending');
	}

}
