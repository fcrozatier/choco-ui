<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { toggleVariants, type ToggleProps } from "../toggle";
	import { get } from ".";
	import type { SwitchProps } from "../switch";
	import { choco } from "$lib/actions/choco";
	import { trimUndefined } from "@fcrozatier/ts-helpers";
	import type { SwitchOptions } from "$lib/components/switch.svelte";

	let {
		class: className,
		size,
		variant,
		value,
		active,
		children,
		...restProps
	}: SwitchProps & { value: string; children: Snippet } = $props();

	const item = get().createItem(trimUndefined<SwitchOptions>({ active, value }));
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<button
	use:choco={item}
	class={toggleVariants({ variant: variant ?? ctxVariant, size, className })}
	{...restProps}
>
	{@render children()}
</button>
