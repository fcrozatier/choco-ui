import type { CreateSwitch } from "$lib/builders/switch/switch.svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./switch.svelte";

export type SwitchProps = HTMLButtonAttributes & CreateSwitch;

export {
	Root,
	//
	Root as Switch,
};
