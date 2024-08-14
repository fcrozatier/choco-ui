import type { SwitchOptions, Switch as TSwitch } from "$lib/headless/switch.svelte.js";
import type { Attributes } from "$lib/mixins/types.js";
import type { StripThunks } from "$lib/utils/binding.js";
import Switch from "./switch.svelte";

export type SwitchProps = StripThunks<SwitchOptions> & {
  class?: string;
  element?: Omit<Attributes<HTMLButtonElement>, "class" | "value" | "checked" | "aria-labelledby">;
  labelledby: string;
  variant?: "default" | "outline";
  builder?: (_options?: SwitchOptions) => TSwitch;
};

export { Switch };
