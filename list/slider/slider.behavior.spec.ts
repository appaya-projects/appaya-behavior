
import { BehaviorBootstrap } from '../../src/behavior-bootstrap';
import { AppayaReporter } from '@appaya/karma-html-reporter/reporter';
import { Behavior } from '../../src/classes/behavior';
import { SliderBehavior } from './index';

fdescribe('Slider behavior', () => {
	let behaviors: Behavior[] = [],
		appayaReporter = new AppayaReporter();
	beforeAll(() => {
		appayaReporter.container.add(`
		<style>
			.slide {
				text-align: center;
				font-weight: 700;	
			}
			.slide p {
				margin: 10px;
				padding: 20px;
				background: white;
				font-size: 1.5rem;
			}
			
			.bSlider__item--active > div {
				border: 1px solid;
			}
		</style>
		<div appaya-behavior="slider" data-slide-width="100">
			<div class="slide"><p>0</p></div>
			<div class="slide"><p>1</p></div>
			<div class="slide"><p>2</p></div>
			<div class="slide"><p>3</p></div>
			<div class="slide"><p>4</p></div>
		</div>
		`);
		behaviors = BehaviorBootstrap([
			SliderBehavior
		]);
	});
	
	it('Slider should be ', () => {
		expect(Object.getPrototypeOf(behaviors[0]).constructor.behaviorName).toBe("slider");
		const sliderBehavior = behaviors[0] as SliderBehavior;

		for(let optionIndex in sliderBehavior.options) {
			appayaReporter.log.add(`Option "${optionIndex}" - ${sliderBehavior.options[optionIndex]}`);
		}
	});

	it('Slider should create elements ', () => {
		const sliderBehavior = behaviors[0] as SliderBehavior;

		expect(sliderBehavior.children.sliderTrack).not.toBeUndefined();
		expect(sliderBehavior.children.slides).not.toBeUndefined();
	});
});
