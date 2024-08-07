import type { ConcreteToggleOptions, ToggleOptions } from "$lib/headless/toggle.svelte.js";
import type { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { HTMLButtonAttributes } from "svelte/elements";
import Toggle from "./toggle.svelte";

export interface ToggleProps extends Omit<HTMLButtonAttributes, "value">, ToggleOptions {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  builder?: (_options?: ConcreteToggleOptions) => InstanceType<ReturnType<typeof Togglable>>;
}

export { Toggle };
