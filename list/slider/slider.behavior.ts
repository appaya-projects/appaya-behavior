/**
 * @module SliderBehavior
 */

import { Behavior } from "../../src/classes/behavior";

import { ISliderOptions } from "./interfaces/slider-options.interface";
import { ISliderChildren } from "./interfaces/slider-children.interface";
import { ISliderData } from "./interfaces/slider-data.interface";
import { ISliderCallbacks } from "./interfaces/slider-callbacks.interface";

import { SliderNavigator } from "./classes/slider-navigator";
import { SliderModule } from "./classes/slider-module";
import { SliderCore } from "./classes/slider-core";
import { SliderArrowsModule } from "./classes/slider-arrows-module";
import { SliderDragModule } from "./classes/slider-drag-module";
import { SliderInfinityModule } from "./classes/slider-infinity-module";
import { SliderCenterModule } from "./classes/slider-center-module";
import { SliderDotsModule } from "./classes/slider-dots-module";

export class SliderBehavior extends Behavior {
	public static behaviorName = 'slider';

	public options: ISliderOptions;
	public children: ISliderChildren;

	protected defaultOptions: ISliderOptions = {
		slideWidth: 0,
		useArrows: true,
		useDots: true,
		draggable: true,
		infinity: true,
		center: true,
		centerIgnoreEdges: true,
		autoplay: 5000,
		autoplayOnHover: false,
		autoplayOnFocus: true,
		adaptiveHeight: true,
		slideAnimationSpeed: 500
	};

	public readonly data: ISliderData = {
		currentIndex: 0,
		currentPosition: 0,
		slideWidth: 0,
		firstIndex: 0,
		lastIndex: 0,
		slidesToShow: 0,
		slidesCount: 1,
		rightIndexOffset: 2,
		leftIndexOffset: 0,
		isBusy: false
	}

	public readonly callbacks: ISliderCallbacks = {
		slidesSizingTrigger: () => {
			this.core.slidesSizing();
		},
		onSlideChange: (ignoreCurrent: boolean, silent: boolean) => {
			this.core.onSlideChange(ignoreCurrent, silent);

			for(let module of this.modules) {
				module.onSlideChange(ignoreCurrent, silent);
			}

			this.onSlide(this.data.currentIndex);
		},
		onResponsiveChange: () => {
			const slidesToShow = this.data.slidesToShow;
			this.core.onResponsiveChange(slidesToShow);

			for(let module of this.modules) {
				module.onResponsiveChange(slidesToShow);
			}
		}
	};

	public navigator: SliderNavigator;
	public core: SliderCore;
	public modules: SliderModule[];

	public get sliderList(): HTMLElement 	{ return this.children.sliderList; }
	public get sliderTrack(): HTMLElement 	{ return this.children.sliderTrack; }
	public get slides(): HTMLElement[] 		{ return this.children.slides; }

	public init(): void {
		this.initModules();
		this.build();

		this.events();

		for(let module of this.modules) {
			module.afterInit();
		}

		this.navigator.slideTo(this.data.currentIndex, true, true);
	}

	protected initModules(): void {
		this.navigator = this.createNavigator();

		this.core = this.createCore();
		this.modules = this.createModules();

		console.log(this);
	}

	protected build(): void {
		this.core.build();
		
		for(let module of this.modules) {
			module.build();
		}
	}

	public destroy() {
		for(let module of this.modules) {
			module.destroy();
		}

		this.core.destroy();
	}

	protected events() {
		this.core.events();

		for(let module of this.modules) {
			module.events();
		}
	}

	protected createCore(): SliderCore {
		return new SliderCore(this);
	}

	protected createNavigator(): SliderNavigator {
		return new SliderNavigator(this.children, this.data, this.callbacks, this.options);
	}

	protected createModules(): SliderModule[] {
		const modules: SliderModule[] = [];

		if(this.options.infinity) {
			modules.push(new SliderInfinityModule(this));
		}

		if(this.options.center) {
			modules.push(new SliderCenterModule(this));
		}
		
		if(this.options.useArrows) {
			modules.push(new SliderArrowsModule(this))
		}

		if(this.options.useDots) {
			modules.push(new SliderDotsModule(this));
		}

		

		if(this.options.draggable) {
			modules.push(new SliderDragModule(this));
		}

		

		return modules;
	}	

	protected onSlide(slideIndex: number) {
		console.log(slideIndex);
	}

}
