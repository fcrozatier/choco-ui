import Root from "./toggle-group.svelte";
import Item from "./toggle-group-item.svelte";
import { tv } from "tailwind-variants";
import { getContext, setContext } from "svelte";
import type { ToggleButton, ToggleOptions } from "$lib/components/toggle.svelte";
import type { ToggleProps } from "../toggle";

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

export function setItemContext(createItem: (options: ToggleOptions) => ToggleButton) {
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

export { Root, Item, Root as ToggleGroup, Item as ToggleItem };
