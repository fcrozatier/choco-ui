import { type VariantProps, tv } from "tailwind-variants";
import Root from "./toggle.svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { createToggle, CreateToggle } from "$lib/builders/toggle/toggle.svelte";

export const toggleVariants = tv({
	base: "ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[pressed=true]:bg-accent data-[checked=true]:bg-accent data-[pressed=true]:text-accent-foreground data-[checked=true]:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent",
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
		Partial<VariantProps<typeof toggleVariants>> {
	builder?: ReturnType<typeof createToggle>;
}

export {
	Root,
	//
	Root as Toggle,
};
