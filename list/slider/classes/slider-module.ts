/**
 * @module SliderBehavior
 */

import { SliderBehavior } from "../slider.behavior";
import { ISliderData } from "../interfaces/slider-data.interface";
import { ISliderOptions } from "../interfaces/slider-options.interface";
import { ISliderChildren } from "../interfaces/slider-children.interface";
import { SliderNavigator } from "./slider-navigator";
import { ISliderCallbacks } from "../interfaces/slider-callbacks.interface";

export abstract class SliderModule {
	public element: HTMLElement;
	public children: ISliderChildren;
	public options: ISliderOptions;
	public data: ISliderData;
	public navigator: SliderNavigator;
	public callbacks: ISliderCallbacks;

	constructor(slider: SliderBehavior) {
		this.element = slider.element;
		this.children = slider.children;
		this.options = slider.options;
		this.data = slider.data;
		this.navigator = slider.navigator;
		this.callbacks = slider.callbacks;
	}

	public abstract afterInit(): void;
	public abstract build(): void;
	public abstract destroy(): void;
	public abstract events(): void;

	public onSlideChange(_ignoreCurrent: boolean, _silent: boolean): void {

	};
	public onResponsiveChange(_slidesToShow: number): void {

	};
}