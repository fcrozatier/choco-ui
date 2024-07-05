import type { ToggleGroup } from "$lib/headless/toggle-group.svelte.js";
import type { ConcreteToggleOptions, ToggleButton } from "$lib/headless/toggle.svelte.js";
import { getContext, setContext } from "svelte";
import { tv } from "tailwind-variants";
import type { ToggleProps } from "../toggle/index.js";
import Item from "./toggle-group-item.svelte";
import Root from "./toggle-group.svelte";

export const toggleGroupVariants = tv({
  base: "flex items-center justify-center gap-1",
  variants: {
    orientation: {
      horizontal: "",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const toggleItemSymbol = Symbol();

export function setItemContext(createItem: InstanceType<typeof ToggleGroup>["createItem"]) {
  setContext(toggleItemSymbol, createItem);
}

export function getItemContext() {
  return getContext<(options?: ConcreteToggleOptions) => ToggleButton>(toggleItemSymbol);
}

const toggleVariantSymbol = Symbol();
export function setVariantContext(variant: ToggleProps["variant"]) {
  setContext(toggleVariantSymbol, variant);
}

export function getVariantContext() {
  return getContext<ToggleProps["variant"]>(toggleVariantSymbol);
}

export { Item, Root };
