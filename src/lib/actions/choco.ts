import type { ChocoBase } from "$lib/components/base.svelte";
import type { Action } from "svelte/action";

export const choco = (<T extends HTMLElement>(node: NoInfer<T>, _param: ChocoBase<T>) => {
	if (node) {
		throw new Error("To remove this error add choco preprocessor to your svelte config");
	}
}) satisfies Action<HTMLElement, ChocoBase<HTMLElement>>;
