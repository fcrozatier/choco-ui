import type { StripThunks } from "$lib/utils/binding.js";
import type { Attributes } from "$lib/utils/types.js";
import type { Toggleable } from "chocobytes/blocks/toggleable.svelte.js";
import type { ToggleOptions } from "chocobytes/headless/toggle.svelte.js";
import type { Snippet } from "svelte";
import Toggle from "./toggle.svelte";

export interface ToggleProps extends StripThunks<ToggleOptions> {
  class?: string;
  element?: Omit<Attributes<"button">, "value" | "class">;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  children?: Snippet;
  builder?: (_options?: ToggleOptions) => Toggleable;
}

export { Toggle };
