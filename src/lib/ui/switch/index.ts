import type { SwitchOptions } from "$lib/headless/switch.svelte.js";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import type { toggleVariants } from "../toggle/index.js";
import Switch from "./switch.svelte";

export interface SwitchProps
	extends Omit<HTMLButtonAttributes, "value">,
		SwitchOptions,
		Partial<VariantProps<typeof toggleVariants>> {}

export { Switch };
