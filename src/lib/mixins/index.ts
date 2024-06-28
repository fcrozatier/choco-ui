import type { ChocoBase } from "$lib/components/base.svelte.js";
import type { Constructor } from "./types.js";

export const mix = <T extends Constructor<ChocoBase>>(superclass: T) =>
	new MixinBuilder(superclass);

class MixinBuilder<SuperClass> {
	superclass;

	constructor(superclass: Constructor<SuperClass>) {
		this.superclass = superclass;
	}

	with = <T extends ((...args: any[]) => any)[]>(...mixins: T) => {
		return mixins.reduce((c, mixin) => mixin(c), this.superclass);
	};
}
