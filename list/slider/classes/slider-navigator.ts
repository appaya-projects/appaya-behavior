/**
 * @module SliderBehavior
 */

import { ISliderData } from "../interfaces/slider-data.interface";
import { ISliderChildren } from "../interfaces/slider-children.interface";
import { ISliderCallbacks } from "../interfaces/slider-callbacks.interface";
import { ISliderOptions } from "../interfaces/slider-options.interface";

export class SliderNavigator {
	constructor(public children: ISliderChildren, public data: ISliderData, public callbacks: ISliderCallbacks, public options: ISliderOptions) {}

	public async slideTo(slideIndex: number, ignoreCurrent = false, silent = false) {
		
		slideIndex = this.fixedIndex(slideIndex);

		if(!ignoreCurrent && this.data.currentIndex == slideIndex) {
			return;
		}
		this.data.isBusy = true;
		const slide = this.getSlide(slideIndex);

		
		if(slide) {
			if(this.data.currentSlide) {
				this.data.currentSlide.classList.remove('bSlider__item--active');
			}

			
			await this.animSlide(slide, silent);
			this.data.currentSlide = slide;

			if(this.data.currentSlide) {
				this.data.currentSlide.classList.add('bSlider__item--active');
			}
			
		}

		this.data.isBusy = false;
		this.callbacks.onSlideChange(ignoreCurrent, silent);
	}

	public fixSlidePosition() {
		const slide = this.getSlide(this.data.currentIndex);

		this.children.sliderTrack.style.transform = `translateX(${slide.offsetLeft * -1}px)`;			
	}

	public async nextSlide() {
		return this.slideTo(this.data.currentIndex + 1);
	}

	public async prevSlide() {
		return this.slideTo(this.data.currentIndex - 1);
	}

	public async slideToClosest(position: number) {
		const currentPosition = this.data.currentPosition,
			  slideMoving = (position - currentPosition)/(this.data.slideWidth);

		let closestIndex = this.data.currentIndex;
		console.log(currentPosition, position, currentPosition, this.data.slideWidth);
		if(slideMoving > .33) {
			slideMoving - Math.floor(slideMoving) > .33? closestIndex += Math.ceil(slideMoving): closestIndex += Math.floor(slideMoving)
		} else if (slideMoving < -.33) {
			slideMoving - Math.ceil(slideMoving) < -.33? closestIndex += Math.floor(slideMoving): closestIndex += Math.ceil(slideMoving)
		}

		this.slideTo(closestIndex, true);
	}

	public isReachable(slideIndex: number) {
		return slideIndex == this.fixedIndex(slideIndex);
	}

	protected fixedIndex(slideIndex: number): number {
		const maxSlideIndex = this.data.lastIndex - this.data.rightIndexOffset,
			minSlideIndex = this.data.firstIndex + this.data.leftIndexOffset;

		slideIndex = Math.max(slideIndex, minSlideIndex);
		slideIndex = Math.min(slideIndex, maxSlideIndex);

		return slideIndex;
	}

	protected getSlide(slideIndex: number): HTMLElement {
		let slide = this.children.slides.find(s => parseInt(s.dataset['index'] as string) == slideIndex);
		
		if(!slide) {
			slide = this.children.slides.find(s => parseInt(s.dataset['index'] as string) == this.data.currentIndex) as HTMLElement;
		}

		return slide;
	}

	protected async animSlide(slide: HTMLElement, silent: boolean) {
		const animationSpeed = this.options.slideAnimationSpeed? this.options.slideAnimationSpeed: 500;

		if(!silent) {
			this.children.sliderTrack.style.transition = `transform ${animationSpeed}ms ease-in`;
		}
		
		this.children.sliderTrack.style.transform = `translateX(${slide.offsetLeft * -1}px)`;
		this.data.currentIndex = parseInt(slide.dataset['index'] as string);
		this.data.currentPosition = slide.offsetLeft;

		if(!silent) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, animationSpeed)
			});

			this.children.sliderTrack.style.transition = '';
		}
	}
	

}