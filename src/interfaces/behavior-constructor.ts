/**
 * @module Core
 */

import { Behavior } from "../classes/behavior";
import { IBehaviorChildren } from "./behavior-children";
import { IBehaviorOptions } from "./behavior-options";

export interface IBehaviorConstructor {
	behaviorName: string;
    new (element: HTMLElement, options: IBehaviorOptions, children: IBehaviorChildren): Behavior;
}