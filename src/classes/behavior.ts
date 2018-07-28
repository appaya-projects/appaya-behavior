/**
 * @module Core
 */

import { IBehaviorOptions } from "../interfaces/behavior-options";
import { IBehaviorChildren } from "../interfaces/behavior-children";

export abstract class Behavior {
	public static behaviorName: string;

	protected abstract defaultOptions: { [key: string]: any };

	public options: { [key: string]: any } = {};
	constructor(public element: HTMLElement, protected _options: IBehaviorOptions, public readonly children: IBehaviorChildren) {}

	public abstract init(): void;

	public beforeInit(): void {
		this.mergeOptions(this._options);
	}

	private mergeOptions(_options: { [key: string]: any }) {
		for (let i in this.defaultOptions) {
			this.options[i] = this.defaultOptions[i];
		}

		for (let i in _options) {
			this.options[i] = _options[i];
		}
	}

	public addChildren(childName: string, child: HTMLElement | HTMLElement[]) {
		this.children[childName] = child;
	}

	public removeChildren(childName: string) {
		delete this.children[childName];
	}
}
