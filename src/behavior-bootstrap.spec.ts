import { AppayaReporter } from '@appaya/karma-html-reporter/reporter';

import { BehaviorBootstrap } from './behavior-bootstrap';
import { Behavior } from './classes/behavior';

class TestBahavior extends Behavior {
	protected defaultOptions: { [key: string]: any; } = {};
	public static behaviorName = 'test';

	public init(): void {
	}
}



describe('Behavior Bootstrap', () => {
	let behaviors: Behavior[] = [],
		appayaReporter = new AppayaReporter();
	beforeAll(() => {
		appayaReporter.container.add('<h2 appaya-behavior="test" data-options="testOptions">appaya <span test-child="mySpans">container</span><span test-child="mySpans">container</span> <span test-child="myOtherSpan">container</span></h2>')
		appayaReporter.container.add('<h2 appaya-behavior="test" data-options="testOptions">appaya <span test-child="mySpans">container</span><span test-child="mySpans">container</span> <span test-child="myOtherSpan">container</span></h2>')
		behaviors = BehaviorBootstrap([
			TestBahavior,
		], {
			"testOptions": {
				test: "testValue"
			}
		});
	});

	beforeEach(() => {
		
	});

	it('behaviorsContainer should exists', () => {
		expect(behaviors).toBeTruthy();

	});

	it('TestBehavior should have custom options', () => {
		const testBehavior = behaviors[0] as TestBahavior;

		expect(testBehavior.options["test"]).toBe("testValue");
		for (let optionIndex in testBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${testBehavior.options[optionIndex]}`);
		}
	});

	it('behaviors should contains two items', () => {
		expect(behaviors.length).toBe(2);
	});

	it('TestBehavior should have children', () => {
		const testBehavior = behaviors[0] as TestBahavior,
		spans = testBehavior.element.querySelectorAll('span');
		
		expect(testBehavior.children["mySpans"]).toContain(spans[0] as HTMLElement);
		expect(testBehavior.children["myOtherSpan"]).toBe(spans[2] as HTMLElement);
		for (let optionIndex in testBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${testBehavior.options[optionIndex]}`);
		}
	});

});
