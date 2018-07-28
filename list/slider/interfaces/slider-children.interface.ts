/**
 * @module SliderBehavior
 */

import { IBehaviorChildren } from "../../../src/interfaces/behavior-children";

export interface ISliderChildren extends IBehaviorChildren {
	sliderTrack: HTMLElement;
	sliderList: HTMLElement;
	slides: HTMLElement[];

	arrowsContainer: HTMLElement;
	arrows: HTMLElement[];

	dotsContainer: HTMLElement;
	dots: HTMLElement[];
}