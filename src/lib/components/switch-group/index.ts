import type { SwitchGroup } from "$lib/headless/switch-group.svelte.js";
import type { GroupOptions } from "$lib/mixins/group.svelte.js";
import type { Attributes } from "$lib/utils/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import type { ToggleProps } from "../toggle/index.js";
import Item from "./switch-group-item.svelte";
import Root from "./switch-group.svelte";

export type SwitchGroupProps = {
  class?: string;
  element?: Omit<Attributes<"fieldset">, "class">;
  /**
   * @default focus: {
   * loop: false,
   * roving: false,
   * preventInactivation: false,
   * exclusive: false
   * }
   */
  focus?: Omit<GroupOptions, "group" | "setGroup">;
  group: string[];
  variant?: ToggleProps["variant"];
  children: Snippet;
};

const key = Symbol();

export function set(group: SwitchGroup) {
  setContext(key, group);
}

export function get() {
  return getContext<SwitchGroup>(key);
}

export { Item, Root };
