import type { CreateSwitch } from "$lib/builders/switch/switch.svelte";
import type { HTMLButtonAttributes, HTMLInputAttributes } from "svelte/elements";
import Root from "./switch.svelte";

export type SwitchProps = (
	| (HTMLButtonAttributes & { element?: "button" })
	| (HTMLInputAttributes & { element: "input" })
) &
	CreateSwitch;

export {
	Root,
	//
	Root as Switch,
};
