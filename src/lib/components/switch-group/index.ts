import type { SwitchGroup } from "$lib/headless/switch-group.svelte.js";
import type { GroupOptions } from "$lib/mixins/group.svelte.js";
import type { Orientation } from "$lib/mixins/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import type { HTMLFieldsetAttributes } from "svelte/elements";
import type { ToggleProps } from "../toggle/index.js";
import Item from "./switch-group-item.svelte";
import Root from "./switch-group.svelte";

export type SwitchGroupProps = HTMLFieldsetAttributes & {
  focus?: Omit<GroupOptions, "active" | "setActive">;
  active: string[];
  orientation?: Orientation;
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
