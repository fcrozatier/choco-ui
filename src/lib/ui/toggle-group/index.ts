import Root from "./toggle-group.svelte";
import Item from "./toggle-group-item.svelte";
import { tv } from "tailwind-variants";

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

export { Root, Item, Root as ToggleGroup, Item as ToggleItem };
