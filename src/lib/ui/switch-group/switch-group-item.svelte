<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { getContext, type Snippet } from "svelte";
	import type { SwitchProps } from "../switch/index.js";
	import { toggleVariants, type ToggleProps } from "../toggle/index.js";
	import { get } from "./index.js";

	let {
		class: className,
		size,
		variant,
		value,
		active,
		children,
		...restProps
	}: SwitchProps & { value: string; children: Snippet } = $props();

	const item = get().createItem({ active, value });
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<button
	use:choco={item}
	class={toggleVariants({ variant: variant ?? ctxVariant, size, className })}
	{...restProps}
>
	{@render children()}
</button>
