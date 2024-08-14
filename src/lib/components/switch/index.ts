import type { SwitchOptions, Switch as TSwitch } from "$lib/headless/switch.svelte.js";
import type { StripThunks } from "$lib/utils/binding.js";
import type { HTMLInputAttributes } from "svelte/elements";
import Switch from "./switch.svelte";

export type SwitchProps = Omit<HTMLInputAttributes, "value"> &
  StripThunks<SwitchOptions> & {
    variant?: "default" | "outline";
    builder?: (_options?: SwitchOptions) => TSwitch;
  };

export { Switch };
