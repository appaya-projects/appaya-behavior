/**
 * @module Core
 */

import { IBehaviorConstructor } from "./interfaces/behavior-constructor";
import { IBehaviorOptions } from "./interfaces/behavior-options";
import { BehaviorsParser } from "./core/behaviors-parser";
import { Behavior } from "./classes/behavior";


export function BehaviorBootstrap(behaviors: IBehaviorConstructor[], options: IBehaviorOptions = {}): Behavior[] {
	const behaviorsParser = new BehaviorsParser(behaviors, options),
		instances = behaviorsParser.initializeBehaviors();

	behaviorsParser.checkBehaviors();

	for(let instance of instances) {
		instance.beforeInit();
		instance.init();
	}

	return instances;
}