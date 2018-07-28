/**
 * @module Core
 */

import { IBehaviorConstructor } from "../interfaces/behavior-constructor";
import { IBehaviorOptions } from "../interfaces/behavior-options";
import { Behavior } from "../classes/behavior";
import { IBehaviorChildren } from "../interfaces/behavior-children";

export class BehaviorsParser {
	constructor(public readonly behaviors: IBehaviorConstructor[], public options: IBehaviorOptions = {}) {

	}

	public initializeBehaviors(): Behavior[] {
		const behaviorElements = document.querySelectorAll('[appaya-behavior]'),
			behaviorInstances: Behavior[] = [];

		for (let i = 0; i < behaviorElements.length; i++) {
			const element: HTMLElement = behaviorElements[i] as HTMLElement,
				attrs = element.getAttribute('appaya-behavior');

			if (attrs == null) {
				continue;
			}

			const attrsArray = attrs.split(';');

			for (const behavior of this.behaviors.filter(b => attrsArray.indexOf(b.behaviorName) >= 0)) {
				const behaviorInstance = this.createInstance(element, behavior);

				behaviorInstances.push(behaviorInstance);
			}

			element.removeAttribute('appaya-behavior');
		}

		return behaviorInstances;
	}

	public checkBehaviors(): void {
		for (const behavior of this.behaviors) {
			if (behavior.behaviorName == null) {
				console.warn('Null "behaviorName" on ' + behavior.name);
			}
		}
	}

	private createInstance(element: HTMLElement, behavior: IBehaviorConstructor): Behavior {
		const options = this.parseOptions(element);
		const children = this.parseChildren(element, behavior);

		return new behavior(element, options, children);
	}

	private parseOptions(element: HTMLElement): any {
		const dataset = element.dataset,
			datasetOptions = dataset['options'];
		let options: any = {};

		if(datasetOptions) {
			if(this.options[datasetOptions]) {
				options = this.options[datasetOptions];
			}
		}
		
		for(let i in dataset) {
			const data = dataset[i];
			let parsedData: any = data;

			switch(data) {
				case 'true':
					parsedData = true;
					break;
				case 'false':
					parsedData = false;
					break;
				default:
					if(!isNaN(parseInt(parsedData))) {
						parsedData = parseInt(parsedData);
					}
			}

			options[i] = parsedData;

			try {
				delete element.dataset[i];
			} catch(e) {
				console.warn(e);
			}
		}

		return options;
	}

	private parseChildren(element: HTMLElement, behavior: IBehaviorConstructor) {
		let childrenObject: IBehaviorChildren = {};
		const children = element.querySelectorAll(`[${behavior.behaviorName}-child]`);

		for(let i = 0; i < children.length; i++) {
			const child = children[i] as HTMLElement,
				childName = child.getAttribute(`${behavior.behaviorName}-child`);

			if(!childName)
				continue;

			const childObject = childrenObject[childName];

			if(childObject) {
				if(Array.isArray(childObject)) {
					childObject.push(child);
				} else {
					childrenObject[childName] = [childObject, child];
				}
			} else {
				childrenObject[childName] = child;
			}

			child.removeAttribute(`${behavior.behaviorName}-child`);				
		}

		return childrenObject;
	}
}