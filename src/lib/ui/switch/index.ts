import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./switch.svelte";
import type { CreateToggle } from "$lib/builders/toggle/toggle.svelte";

export type SwitchProps = HTMLButtonAttributes & CreateToggle;

export {
	Root,
	//
	Root as Switch,
};
