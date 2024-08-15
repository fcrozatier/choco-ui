import type { SwitchOptions, Switch as TSwitch } from "$lib/headless/switch.svelte.js";
import type { Attributes } from "$lib/mixins/types.js";
import type { StripThunks } from "$lib/utils/binding.js";
import Switch from "./switch.svelte";

export type SwitchProps = StripThunks<SwitchOptions> & {
  class?: string;
  element?: Omit<Attributes<HTMLInputElement>, "class" | "value" | "checked">;
  variant?: "default" | "outline";
  builder?: (_options?: SwitchOptions) => TSwitch;
};

export { Switch };
