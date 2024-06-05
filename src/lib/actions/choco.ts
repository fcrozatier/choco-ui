import type { ChocoBase } from "$lib/components/base.svelte";
import type { Action } from "svelte/action";

export const choco = (<T extends HTMLElement>(node: NoInfer<T>, _param: ChocoBase<T>) => {
	// Check `node` so ts does not infer a never return type
	if (node) {
		throw new Error("To remove this error add choco preprocessor to your svelte config");
	}
}) satisfies Action<HTMLElement, ChocoBase<HTMLElement>>;
