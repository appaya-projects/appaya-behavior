/**
 * @module SliderBehavior
 */


export interface ISliderData {
	currentIndex: number;
	leftIndexOffset: number;
	rightIndexOffset: number;
	currentPosition: number;
	slideWidth: number;
	firstIndex: number;
	lastIndex: number;
	slidesCount: number;
	slidesToShow: number;	
	isBusy: boolean;
	currentSlide?: HTMLElement;
}