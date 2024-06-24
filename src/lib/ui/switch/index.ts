import type { SwitchOptions } from "$lib/components/switch.svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import type { toggleVariants } from "../toggle";
import Switch from "./switch.svelte";

export interface SwitchProps
	extends Omit<HTMLButtonAttributes, "value">,
		SwitchOptions,
		Partial<VariantProps<typeof toggleVariants>> {}

export { Switch };
