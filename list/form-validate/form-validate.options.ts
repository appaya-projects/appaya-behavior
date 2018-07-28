/**
 * @module FormValidateBehavior
 */

export interface FormValidateOptions {
	type?: "mixed" | "submit" | "keyup";
	first?: boolean;

	[key: string]: any;
}