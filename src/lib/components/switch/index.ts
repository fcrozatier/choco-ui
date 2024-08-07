import type {
  ConcreteSwitchOptions,
  SwitchOptions,
  Switch as TSwitch,
} from "$lib/headless/switch.svelte.js";
import type { HTMLButtonAttributes } from "svelte/elements";
import Switch from "./switch.svelte";

export interface SwitchProps extends Omit<HTMLButtonAttributes, "value">, SwitchOptions {
  variant?: "default" | "outline";
  builder?: (_options?: ConcreteSwitchOptions) => TSwitch;
}

export { Switch };
