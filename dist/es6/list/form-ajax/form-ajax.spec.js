var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormAjaxBehavior } from './form-ajax.behavior';
import { BehaviorBootstrap } from '../../src/behavior-bootstrap';
import { AppayaReporter } from '@appaya/karma-html-reporter/reporter';
import { FormValidateBehavior } from '../form-validate';
import { Http } from './classes/http';
describe('Form Ajax behavior', () => {
    let behaviors, appayaReporter = new AppayaReporter();
    beforeAll(() => {
        appayaReporter.container.add(`
		<form appaya-behavior="form-ajax;form-validate" novalidate enctype="application/json"
				action="https://reqres.in/api/register"
				data-message-success="Sent"
				data-message-failure="Error"
				data-options="myoptions">
			<input form-ajax-child="inputs" type="text" name="email" data-value-missing="This field is required!" value="test@mail">
			<input form-ajax-child="inputs" type="text" name="password" value="testpass">
			<input form-ajax-child="submit" type="submit" value="Submit">
		</form>
		`);
        behaviors = BehaviorBootstrap([
            FormAjaxBehavior, FormValidateBehavior
        ]);
    });
    it('Form ajax behavior should be ', () => {
        const formBehavior = behaviors[0];
        expect(Object.getPrototypeOf(behaviors[0]).constructor.behaviorName).toBe("form-ajax");
        for (let optionIndex in formBehavior.options) {
            appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
        }
    });
    it('Form ajax behavior should send request', () => __awaiter(this, void 0, void 0, function* () {
        spyOn(Http, 'post').and.returnValue({
            status: 200,
            statusText: 'HTTP/1.1 200 OK',
            contentType: 'text/xml;charset=UTF-8',
            responseText: '<soap:Envelope><soap:Body><loginResponse><success>true</success></loginResponse></soap:Body></soap:Envelope>'
        });
        const formBehavior = behaviors[0];
        yield formBehavior.sendForm();
        let ajaxBox = formBehavior.element.parentElement.querySelector('.ajax-box');
        expect(ajaxBox.innerHTML).toBe("<p>Sent</p>");
        for (let optionIndex in formBehavior.options) {
            appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
        }
    }));
    it('Form ajax behavior should fail request', () => __awaiter(this, void 0, void 0, function* () {
        spyOn(Http, 'post').and.throwError('error');
        const formBehavior = behaviors[0];
        yield formBehavior.sendForm();
        let ajaxBox = formBehavior.element.parentElement.querySelector('.ajax-box');
        expect(ajaxBox.innerHTML).toBe("<p>Error</p>");
        for (let optionIndex in formBehavior.options) {
            appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
        }
    }));
});
//# sourceMappingURL=form-ajax.spec.js.map