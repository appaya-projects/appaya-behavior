
import { FormAjaxBehavior } from './form-ajax.behavior';
import { BehaviorBootstrap } from '../../src/behavior-bootstrap';
import { AppayaReporter } from '@appaya/karma-html-reporter/reporter';
import { FormValidateBehavior } from '../form-validate';
import { Http } from './classes/http';
import { Behavior } from '../../src/classes/behavior';

describe('Form Ajax behavior', () => {
	let behaviors: Behavior[],
		appayaReporter = new AppayaReporter();
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
		

		const formBehavior = behaviors[0] as FormAjaxBehavior;

		expect(Object.getPrototypeOf(behaviors[0]).constructor.behaviorName).toBe("form-ajax");

		for (let optionIndex in formBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
		}
	});

	it('Form ajax behavior should send request', async () => {
		spyOn(Http, 'post').and.returnValue({
			status: 200,
			statusText: 'HTTP/1.1 200 OK',
			contentType: 'text/xml;charset=UTF-8',
			responseText: '<soap:Envelope><soap:Body><loginResponse><success>true</success></loginResponse></soap:Body></soap:Envelope>'
		});

		const formBehavior = behaviors[0] as FormAjaxBehavior;

		await formBehavior.sendForm();

		let ajaxBox = (<HTMLElement>formBehavior.element.parentElement).querySelector('.ajax-box') as HTMLElement;
		expect(ajaxBox.innerHTML).toBe("<p>Sent</p>");

		for (let optionIndex in formBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
		}
	});

	it('Form ajax behavior should fail request', async () => {
		spyOn(Http, 'post').and.throwError('error');

		const formBehavior = behaviors[0] as FormAjaxBehavior;

		await formBehavior.sendForm();

		let ajaxBox = (<HTMLElement>formBehavior.element.parentElement).querySelector('.ajax-box') as HTMLElement;
		expect(ajaxBox.innerHTML).toBe("<p>Error</p>");

		for (let optionIndex in formBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
		}
	});
});
