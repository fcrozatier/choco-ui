import type { SwitchOptions, Switch as TSwitch } from "$lib/headless/switch.svelte.js";
import type { StripThunks } from "chocobytes/utils/binding.js";
import type { Attributes } from "chocobytes/utils/types.js";
import Switch from "./switch.svelte";

export type SwitchProps = StripThunks<SwitchOptions> & {
  class?: string;
  element?: Omit<Attributes<"input">, "class" | "value" | "checked">;
  variant?: "default" | "outline";
  builder?: (_options?: SwitchOptions) => TSwitch;
};

export { Switch };
