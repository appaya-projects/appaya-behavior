/**
 * @module SliderBehavior
 */

export interface ISliderCallbacks {
	slidesSizingTrigger(): void;
	
	onSlideChange(ignoreCurrent: boolean, silent: boolean): void;
	onResponsiveChange(): void;
}