import { Behavior } from "../../src/classes/behavior";
import { InputError } from "./classes/input-error";
export class FormValidateBehavior extends Behavior {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            type: 'mixed',
            first: false
        };
        this.inputErrors = new Array();
    }
    init() {
        if (this.element.nodeName != 'FORM') {
            console.warn('FormBehavior: element should be form, skip. ', this.element);
            return;
        }
        if (this.options.type == undefined) {
            this.options.type = 'mixed';
        }
        this.inputs = this.element.querySelectorAll('input:not([type="submit"]), textarea');
        for (let i = 0; i < this.inputs.length; i++) {
            this.createInputError(this.inputs[i]);
        }
        this.eventsHandler();
    }
    eventsHandler() {
        const validType = this.options.type;
        this.element.addEventListener('submit', (e) => {
            let isValid = true;
            for (let i = 0; i < this.inputs.length; i++) {
                let validProcess = this.inputValidProcess(this.inputs[i]);
                if (!validProcess) {
                    isValid = validProcess;
                }
                if (this.options.first && !validProcess)
                    break;
            }
            if (!isValid) {
                e.preventDefault();
            }
        });
        if (validType == 'keyup' || validType == 'mixed') {
            for (let i = 0; i < this.inputs.length; i++) {
                const input = this.inputs[i];
                input.addEventListener('keyup', () => {
                    if (validType == 'mixed' && input.getAttribute('dirty') != 'true')
                        return;
                    this.inputValidProcess(input);
                });
            }
        }
    }
    inputValidation(input) {
        return input.checkValidity();
    }
    inputValidProcess(input) {
        const inputError = this.getInputError(input), isValid = this.inputValidation(input);
        if (!isValid) {
            const message = this.getErrorMessage(input);
            inputError.message = message;
            input.setAttribute('dirty', 'true');
            this.onInputError(input);
        }
        else {
            inputError.clear();
            this.onInputValid(input);
        }
        return isValid;
    }
    getErrorMessage(input) {
        let validity = input.validity, message = input.validationMessage;
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
    onInputError(input) {
        input.classList.add('error');
    }
    onInputValid(input) {
        input.classList.remove('error');
    }
    // errors
    createInputError(input) {
        this.inputErrors.push(new InputError(input));
    }
    getInputError(input) {
        let inputError = this.inputErrors.find(i => i.input == input);
        if (!inputError)
            inputError = new InputError(input);
        return inputError;
    }
}
FormValidateBehavior.behaviorName = "form-validate";
//# sourceMappingURL=form-validate.behavior.js.map