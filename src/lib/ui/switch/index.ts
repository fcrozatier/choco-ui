import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./switch.svelte";
import type { SwitchOptions } from "$lib/components/switch.svelte";

export type SwitchProps = HTMLButtonAttributes & SwitchOptions;

export {
	Root,
	//
	Root as Switch,
};
