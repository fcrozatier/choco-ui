<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { getContext, type Snippet } from "svelte";
	import { get } from ".";
	import type { SwitchProps } from "../switch";
	import { toggleVariants, type ToggleProps } from "../toggle";

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
