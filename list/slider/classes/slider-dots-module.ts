/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderDotsModule extends SliderModule {

	public afterInit() { }

	public build() {

		const dotsContainer = document.createElement('DIV') as HTMLElement;
		dotsContainer.classList.add('bSlider__dots');

		for (let slide of this.children.slides) {
			if (slide.hasAttribute('data-clone')) {
				continue;
			}
			const index = slide.getAttribute('data-index');

			if (!index) {
				continue;
			}


			if (!this.navigator.isReachable(parseInt(index))) {
				continue;
			}

			dotsContainer.insertAdjacentHTML('beforeend', `<button class="bSlider__dot ${parseInt(index) == this.data.currentIndex ? 'bSlider__dot--active' : ''}" data-index="${index}">${index}</button>`);

		}

		this.children.dotsContainer = this.element.insertAdjacentElement('beforeend', dotsContainer) as HTMLElement;

		this.children.dots = [].slice.call(dotsContainer.children);

	}

	public destroy() {
		this.element.removeChild(this.children.dotsContainer);
	}

	public events(): void {
		for (const arrow of this.children.dots) {
			arrow.addEventListener('click', async (e) => {
				e.preventDefault();

				const index = arrow.getAttribute('data-index');
				if (index === null) {
					return;
				}

				await this.navigator.slideTo(parseInt(index));


			});
		}

	}

	public onSlideChange() {
		for (const arrow of this.children.dots) {
			const index = arrow.getAttribute('data-index');

			arrow.classList.remove('bSlider__dot--active');
			if (index === null) {
				continue;
			}

			if (parseInt(index) === this.data.currentIndex) {
				arrow.classList.add('bSlider__dot--active');
			}
		}
	}


}