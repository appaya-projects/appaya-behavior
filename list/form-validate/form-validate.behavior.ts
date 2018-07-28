/**
 * @module FormValidateBehavior
 */

import { Behavior } from "../../src/classes/behavior";
import { FormValidateOptions } from "./form-validate.options";
import { InputError } from "./classes/input-error";


export class FormValidateBehavior extends Behavior {
	protected defaultOptions: FormValidateOptions = {
		type: 'mixed',
		first: false
	};

	public static behaviorName = "form-validate";

	protected inputs: NodeListOf<HTMLElement>;
	protected inputErrors = new Array<InputError>();
	
	public options: FormValidateOptions;

	public init(): void {
		if(this.element.nodeName != 'FORM') {
			console.warn('FormBehavior: element should be form, skip. ', this.element);
			return;
		}

		if(this.options.type == undefined) {
			this.options.type = 'mixed';
		}

		this.inputs = this.element.querySelectorAll('input:not([type="submit"]), textarea');

		for(let i = 0; i < this.inputs.length; i++) {
			this.createInputError(this.inputs[i] as HTMLInputElement);
		}

		this.eventsHandler();
	}

	protected eventsHandler() {
		const validType = this.options.type;

		this.element.addEventListener('submit', (e) => {
			let isValid = true;
			for(let i = 0; i < this.inputs.length; i++) {
				let validProcess = this.inputValidProcess(this.inputs[i] as HTMLInputElement);

				if(!validProcess) {
					isValid = validProcess;
				}

				if(this.options.first && !validProcess) break;
			}

			if(!isValid) {
				e.preventDefault();
			}
		});

		if(validType == 'keyup' || validType == 'mixed') {
			for(let i = 0; i < this.inputs.length; i++) {
				const input = this.inputs[i] as HTMLInputElement;
				input.addEventListener('keyup', () => {
					if(validType == 'mixed' && input.getAttribute('dirty') != 'true')
						return;

					this.inputValidProcess(input)
				});
			}
		} 
	}

	protected inputValidation(input: HTMLInputElement): boolean {
		return input.checkValidity();
	}

	protected inputValidProcess(input: HTMLInputElement): boolean {
		const inputError = this.getInputError(input),
			isValid = this.inputValidation(input);

		if(!isValid) {
			const message = this.getErrorMessage(input)

			inputError.message = message;


				
			input.setAttribute('dirty', 'true');
			this.onInputError(input);

		} else {
			inputError.clear();
			this.onInputValid(input);
		}

		return isValid;
	}

	protected getErrorMessage(input: HTMLInputElement) {
		let validity = input.validity as any,
			message = input.validationMessage;

		for (let v in validity) {
			if (!validity[v]) {
				continue;
			}

			let customMessage = input.dataset[v];

			if (customMessage) {
				message = customMessage;

				break;
			}
		}

		return message;
	}

	protected onInputError(input: HTMLInputElement): void {
		input.classList.add('error')
	}

	protected onInputValid(input: HTMLInputElement): void {
		input.classList.remove('error')
	}

	// errors
	protected createInputError(input: HTMLInputElement) {
		this.inputErrors.push(new InputError(input));
	}

	protected getInputError(input: HTMLInputElement): InputError  {
		let inputError = this.inputErrors.find(i => i.input == input);
		
		if(!inputError)
			inputError = new InputError(input);

		return inputError;
	}

}
