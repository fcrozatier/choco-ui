import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./switch.svelte";
import type { ToggleOptions } from "$lib/builders/toggle/toggle.svelte";

export type SwitchProps = HTMLButtonAttributes & ToggleOptions;

export {
	Root,
	//
	Root as Switch,
};
