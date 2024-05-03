import { ChocoBase } from "./base.svelte";
import { Togglable, type TogglableOptions } from "../mixins/togglable.svelte";

export class Toggler extends Togglable(ChocoBase) {
	constructor(options: TogglableOptions) {
		super();
		this.initTogglable(options);
	}
}
