/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderArrowsModule extends SliderModule {
	
	public afterInit() {}

	public build() {
		if (this.options.useArrows) {
			const arrowsContainer = document.createElement('DIV') as HTMLElement;

			arrowsContainer.insertAdjacentHTML('beforeend', `<button class="bSlider__arrow bSlider__arrow--prev" data-direction="prev">Previous</button> <button class="bSlider__arrow bSlider__arrow--next" data-direction="next">Next</button>`)
			this.children.arrowsContainer = this.element.insertAdjacentElement('beforeend', arrowsContainer) as HTMLElement;

			this.children.arrows = [].slice.call(arrowsContainer.children);
		}
	}

	public destroy() {
		this.element.removeChild(this.children.arrowsContainer);
	}

	public events(): void {
		for(const arrow of this.children.arrows) {
			arrow.addEventListener('click', (e) => {
				e.preventDefault();

				const direction = arrow.dataset['direction']? arrow.dataset['direction']: 'next';

				if(direction == 'next') {
					this.navigator.nextSlide();
				} else {
					this.navigator.prevSlide();
				}
			});
		}
		
	}

	public onResponsiveChange(_slidesToShow: number) {

	}


}