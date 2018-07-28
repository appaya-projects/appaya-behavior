import { FormValidateBehavior } from './form-validate.behavior';
import { BehaviorBootstrap } from '../../src/behavior-bootstrap';
import { AppayaReporter } from '@appaya/karma-html-reporter/reporter';
describe('Form Validate behavior', () => {
    let behaviors = [], appayaReporter = new AppayaReporter();
    beforeAll(() => {
        appayaReporter.container.add(`
		<form appaya-behavior="form-validate" 
									 novalidate>
			First name:
			<input type="text" name="firstname" required minlength="6" data-value-missing="This field is required!">
			Last name:
			<input type="text" name="lastname" required>
			<input type="submit" value="Submit">
		</form>
		`);
        behaviors = BehaviorBootstrap([
            FormValidateBehavior
        ]);
    });
    it('Form behavior should be ', () => {
        expect(Object.getPrototypeOf(behaviors[0]).constructor.behaviorName).toBe("form-validate");
        const formBehavior = behaviors[0];
        for (let optionIndex in formBehavior.options) {
            appayaReporter.log.add(`Option "${optionIndex}" - ${formBehavior.options[optionIndex]}`);
        }
    });
});
//# sourceMappingURL=form-validate.spec.js.map