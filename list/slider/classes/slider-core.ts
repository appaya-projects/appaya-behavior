/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderCore extends SliderModule {
	
	
	public afterInit() {}

	public build() {
		const sliderTrack = document.createElement('DIV'),
			sliderList = document.createElement('DIV'),
			children = [].slice.call(this.element.children);;

		// Slider
		this.element.classList.add('bSlider');


		// Slider List
		sliderList.classList.add('bSlider__list');
		this.children.sliderList = this.element.insertAdjacentElement('beforeend', sliderList) as HTMLElement;

		// Slider Track
		sliderTrack.classList.add('bSlider__track');
		sliderTrack.style.transform = 'translateX(0)';
		this.children.sliderTrack = sliderList.insertAdjacentElement('beforeend', sliderTrack) as HTMLElement;

		// Slider Items
		let index = 0;

		this.children.slides = [];

		for (const child of children) {
			const slide = document.createElement('DIV');
			slide.classList.add('bSlider__item');
			slide.dataset['index'] = index.toString();

			sliderTrack.insertAdjacentElement('beforeend', slide);
			slide.insertAdjacentElement('beforeend', child);
			
			this.children.slides.push(slide);

			index++;
		}
		
		this.slidesSizing();

		this.data.lastIndex = this.children.slides.length - 1;
		this.data.slidesCount = this.children.slides.length;
		this.data.firstIndex = 0;
		this.data.leftIndexOffset = 0;
		this.data.rightIndexOffset = this.data.slidesToShow - 1;
	}

	public destroy() {
		for (let slide of this.children.slides) {
			this.element.insertAdjacentElement('beforeend', slide.children[0]);
			(<HTMLElement>slide.parentElement).removeChild(slide);
		}

		this.element.removeChild(this.children.sliderTrack);
		this.element.removeChild(this.children.sliderList);
	}

	public events(): void {
		window.addEventListener('resize', () => {
			this.slidesSizing();
		});
	}

	public slidesSizing() {
		const listWidth = this.children.sliderList.clientWidth,
			initialSlideWidth = this.options.slideWidth;
		
		let slidesToShow = initialSlideWidth? Math.floor(listWidth/initialSlideWidth): 1,
			slideWidth = Math.floor(listWidth / slidesToShow);
		
		this.data.slideWidth = slideWidth;


		for (let slide of this.children.slides) {
			slide.style.width = slideWidth + 'px';
		}
	

		this.children.sliderTrack.style.width = (slideWidth * this.children.slides.length).toString() + 'px';

		if(this.data.slidesToShow != slidesToShow) {
			this.data.slidesToShow = slidesToShow;
			this.callbacks.onResponsiveChange();
		}

		this.navigator.fixSlidePosition();
		
	}

	public onResponsiveChange(_slidesToShow: number) {

	}

}