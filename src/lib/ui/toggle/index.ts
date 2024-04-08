import { type VariantProps, tv } from "tailwind-variants";
import Root from "./toggle.svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { CreateToggle } from "$lib/builders/toggle/press.svelte";

export const toggleVariants = tv({
	base: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [aria-pressed='true']:bg-accent [aria-pressed='true']:text-accent-foreground",
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
		},
		size: {
			default: "h-10 px-3",
			sm: "h-9 px-2.5",
			lg: "h-11 px-5",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface ToggleProps
	extends HTMLButtonAttributes,
		CreateToggle,
		Partial<VariantProps<typeof toggleVariants>> {}

export {
	Root,
	//
	Root as Toggle,
};
