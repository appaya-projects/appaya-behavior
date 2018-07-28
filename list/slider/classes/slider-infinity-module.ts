/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderInfinityModule extends SliderModule {

	public afterInit() {
		// this.element.classList.add('bSlider--infinity');
	}

	public build() {
		if(this.data.slidesCount <= this.data.slidesToShow) {
			return;
		}

		const slidesToShow = this.data.slidesToShow,
			  leftSlides = this.children.slides.slice(0, slidesToShow),
			  rightSlides = this.children.slides.slice(this.children.slides.length - slidesToShow, this.children.slides.length).reverse();

		// Copy slides
		this.children._slides = this.children.slides.slice(0);
		this.children.clones = [];


		for(let slide of leftSlides) {
			const clone = slide.cloneNode(true) as HTMLElement;
			
			this.children.sliderTrack.insertAdjacentElement('beforeend', clone);
			this.children.clones.push(clone);
			this.children.slides.push(clone);
		}

		for(let slide of rightSlides) {
			const clone = slide.cloneNode(true) as HTMLElement;

			
			this.children.sliderTrack.insertAdjacentElement('afterbegin', clone);
			this.children.clones.push(clone);
			this.children.slides.unshift(clone);
		}

		for(let clone of this.children.clones as HTMLElement[]) {
			clone.classList.add('bSlider__item--clone');
			clone.classList.remove('bSlider__item--active');
			clone.setAttribute('data-clone', 'true');
		}

		// reindex all
		this.data.firstIndex = -slidesToShow;
		this.data.lastIndex = this.data.lastIndex + slidesToShow;

		let index = this.data.firstIndex;

		for(let slide of this.children.slides) {
			slide.dataset['index'] = index.toString();
			index ++;
		}		

		this.callbacks.slidesSizingTrigger();

	}

	public destroy() {
		if(this.children.clones) {
			for(let clone of this.children.clones as HTMLElement[]) {
				this.children.sliderTrack.removeChild(clone);
			}
	
			this.children.slides = (<HTMLElement[]>this.children._slides).slice(0);
		}
		
	}

	public events(): void {

	}

	public onSlideChange(_ignoreCurrent: boolean, _silent: boolean) : void {
		console.log('current', this.data.currentIndex);	
		const isClone = this.isSlideClone(this.data.currentIndex);

		if(isClone) {
			const originalIndex = Math.abs(Math.abs(this.data.currentIndex) - this.data.slidesCount);

			this.navigator.slideTo(originalIndex, true, true);
		}
	}

	public isSlideClone(slideIndex: number): boolean {
		return slideIndex < 0 || slideIndex > this.data.slidesCount - 1;
	}

	public onResponsiveChange(_slidesToShow: number) {
		this.destroy();
		this.build();
	}

}