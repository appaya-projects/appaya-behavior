/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderDragModule extends SliderModule {

	protected isDragging: boolean = false;
	protected draggingPosition: number = 0;
	protected swipeLength: number = 0;
	protected lastClientX: number = 0;

	protected leftIndex: number = 0;
	protected rightIndex: number = 0;

	public afterInit() {
		this.element.classList.add('bSlider--draggable');
	}

	public build() {

	}

	public destroy() {
		this.element.removeChild(this.children.arrowsContainer);
	}

	public events(): void {
		//prevent chrome's bug
		document.body.addEventListener('touchstart', function () { });

		//prevent images/text dragging
		const dragElements = this.children.sliderTrack.querySelectorAll(':not([draggable])');

		for (let i = 0; i < dragElements.length; i++) {
			const dragElement = dragElements[i] as HTMLElement;

			dragElement.addEventListener('dragstart', e => e.preventDefault());
		}

		const sliderTrack = this.children.sliderTrack;

		sliderTrack.addEventListener('mousedown', e => this.dragStart(e));
		sliderTrack.addEventListener('touchstart', e => this.dragStart(e));

		
		sliderTrack.addEventListener('mouseup', () => this.dragEnd());
		sliderTrack.addEventListener('touchend', () => this.dragEnd());
		sliderTrack.addEventListener('mouseleave', () => this.dragEnd());
		sliderTrack.addEventListener('touchcancel', () => this.dragEnd());
		
		sliderTrack.addEventListener('mousemove', e => this.dragMove(e));
		sliderTrack.addEventListener('touchmove', e => this.dragMove(e));

	}

	protected dragStart(e: Event) {
		if(this.data.isBusy) 
			return;
			
		let touches = (<any>e).touches,
			clientX = touches !== undefined ? touches[0].pageX : (<any>e).clientX;

		this.isDragging = true;
		this.draggingPosition = this.data.currentPosition;
		this.lastClientX = clientX;
		return false;
	}

	protected dragEnd() {
		if (!this.isDragging)
			return;

		this.isDragging = false;
		this.draggingPosition !== this.data.currentPosition? this.navigator.slideToClosest(this.draggingPosition) : null;

		return false;
	}

	protected dragMove(e: Event) {
		e.preventDefault();
		if (!this.isDragging)
			return;

		let touches = (<any>e).touches,
			clientX = touches !== undefined ? touches[0].pageX : (<any>e).clientX,
			swipeLength = this.lastClientX - clientX,
			swipeDirection = swipeLength < 0 ? "left" : "right",
			leftEdge = 0,
			rightEdge = this.children.sliderTrack.clientWidth-(this.data.slidesToShow * this.data.slideWidth);

		if (swipeLength == 0)
			return;

		if (swipeDirection == "left" && this.draggingPosition < leftEdge) swipeLength = swipeLength * .35;
		else if (swipeDirection == "right" && this.draggingPosition > rightEdge) swipeLength = swipeLength * .35;
		
		this.draggingPosition = Math.round(swipeLength + this.draggingPosition);
		this.lastClientX = clientX;

		this.children.sliderTrack.style.transform = `translateX(${this.draggingPosition * -1}px)`;
	}

}