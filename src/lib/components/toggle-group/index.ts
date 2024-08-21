import type { ToggleGroup } from "$lib/headless/toggle-group.svelte.js";
import type { ToggleButton, ToggleOptions } from "$lib/headless/toggle.svelte.js";
import type { GroupOptions } from "$lib/mixins/group.svelte.js";
import type { Orientation } from "$lib/utils/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import type { HTMLFieldsetAttributes } from "svelte/elements";
import type { ToggleProps } from "../toggle/index.js";
import Item from "./toggle-group-item.svelte";
import Root from "./toggle-group.svelte";

export type ToggleGroupProps = HTMLFieldsetAttributes & {
  focus?: Omit<GroupOptions, "group" | "setGroup">;
  group?: string[];
  orientation?: Orientation;
  variant?: ToggleProps["variant"];
  children: Snippet;
};

const toggleItemSymbol = Symbol();

export function setItemContext(createItem: InstanceType<typeof ToggleGroup>["createItem"]) {
  setContext(toggleItemSymbol, createItem);
}

export function getItemContext() {
  return getContext<(options?: ToggleOptions) => ToggleButton>(toggleItemSymbol);
}

const toggleVariantSymbol = Symbol();
export function setVariantContext(variant: ToggleProps["variant"]) {
  setContext(toggleVariantSymbol, variant);
}

export function getVariantContext() {
  return getContext<ToggleProps["variant"]>(toggleVariantSymbol);
}

export { Item, Root };
