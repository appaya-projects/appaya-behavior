var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Behavior } from "../../src/classes/behavior";
import { Http } from "./classes/http";
export class FormAjaxBehavior extends Behavior {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            messageFailure: undefined,
            messageSuccess: undefined
        };
    }
    init() {
        if (this.element.nodeName != 'FORM') {
            console.warn('FormBehavior: element should be form, skip. ', this.element);
            return;
        }
        this.build();
        this.eventsHandler();
    }
    build() {
        this.element.insertAdjacentHTML('afterend', `
			<div class="ajax-box"></div>
		`);
        this.ajaxBox = this.element.nextElementSibling;
    }
    clearForm() {
        const inputs = this.element.querySelectorAll('input:not([type="submit"]), textarea');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }
    eventsHandler() {
        this.element.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            this.sendForm();
        }));
    }
    sendForm() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.element.checkValidity()) {
                return;
            }
            let form = this.element;
            const action = this.element.getAttribute('action');
            console.log(JSON.stringify(new FormData(form)));
            if (!action) {
                console.warn('Action attribute undefined.', this.element);
                return;
            }
            this.onSend();
            try {
                const req = yield Http.post(action, {
                    form: form,
                    headers: {
                        "Accept": "application/json, text/plain, */*"
                    }
                });
                this.clearForm();
                this.onSuccess(req);
            }
            catch (err) {
                console.warn('Request error.', this.element, err);
                this.onFailure(err);
            }
        });
    }
    onSuccess(req) {
        this.ajaxBox.classList.add('ajax-box--sent');
        let responseText = this.options.messageSuccess ? this.options.messageSuccess : req.responseText;
        this.ajaxBox.innerHTML = '<p>' + responseText + '</p>';
    }
    onFailure(req) {
        this.ajaxBox.classList.add('ajax-box--error');
        let responseText = this.options.messageFailure ? this.options.messageFailure : req.responseText;
        this.ajaxBox.innerHTML = '<p>' + responseText + '</p>';
    }
    onSend() {
        this.ajaxBox.classList.add('ajax-box--pending');
    }
}
FormAjaxBehavior.behaviorName = "form-ajax";
//# sourceMappingURL=form-ajax.behavior.js.map