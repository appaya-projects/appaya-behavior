/**
 * @module SliderBehavior
 */

import { SliderModule } from "./slider-module";

export class SliderCenterModule extends SliderModule {
	
	public afterInit() {

	}

	public build() {
		if(this.options.centerIgnoreEdges) {
			this.data.leftIndexOffset = 0;
			this.data.rightIndexOffset = 0;
		} else {
			this.data.leftIndexOffset = Math.floor(this.data.slidesToShow / 2);
			this.data.rightIndexOffset = Math.floor(this.data.slidesToShow / 2);
		}
		

		this.children.sliderTrack.style.marginLeft = ((this.data.slidesToShow - 1) / 2 * this.data.slideWidth).toString() + 'px';
		
		this.callbacks.slidesSizingTrigger();
	}

	public destroy() {
		this.data.leftIndexOffset = 0;
		this.data.rightIndexOffset = this.data.slidesToShow;
	}

	public events(): void {
		window.addEventListener('resize', () => {
			if(this.options.centerIgnoreEdges) {
				this.data.leftIndexOffset = 0;
				this.data.rightIndexOffset = 0;
			} else {
				this.data.leftIndexOffset = Math.floor(this.data.slidesToShow / 2);
				this.data.rightIndexOffset = Math.floor(this.data.slidesToShow / 2);
			}

			this.children.sliderTrack.style.marginLeft = ((this.data.slidesToShow - 1) / 2 * this.data.slideWidth).toString() + 'px';
			
			if(this.data.currentSlide) {
				this.data.currentPosition = this.data.currentSlide.offsetLeft;
			}
		});
	}

	public onResponsiveChange(_slidesToShow: number) {
		
	}


}