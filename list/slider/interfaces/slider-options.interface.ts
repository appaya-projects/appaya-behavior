/**
 * @module SliderBehavior
 */

import { IBehaviorOptions } from "../../../src/interfaces/behavior-options";

export interface ISliderOptions extends IBehaviorOptions {
	slideWidth: number;
	useArrows?: boolean;
	useDots?: boolean;
	draggable?: boolean;
	infinity?:boolean;
	center?:boolean;
	centerIgnoreEdges?: boolean;

	autoplay?:number;
	autoplayOnHover?:boolean;
	autoplayOnFocus?:boolean;

	slideAnimationSpeed?: number;
	
	adaptiveHeight?:boolean;
	sync?:any;
}