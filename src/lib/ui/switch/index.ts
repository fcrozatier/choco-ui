import type { SwitchOptions } from "$lib/components/switch.svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import Switch from "./switch.svelte";

export type SwitchProps = HTMLButtonAttributes & SwitchOptions;

export { Switch };
