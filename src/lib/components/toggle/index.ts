import type { ToggleOptions } from "$lib/headless/toggle.svelte.js";
import type { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { HTMLButtonAttributes } from "svelte/elements";
import Toggle from "./toggle.svelte";

export interface ToggleProps
  extends Omit<HTMLButtonAttributes, "value">,
    Omit<ToggleOptions, "setActive" | "active"> {
  active?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  builder?: (_options?: ToggleOptions) => InstanceType<ReturnType<typeof Togglable>>;
}

export { Toggle };
