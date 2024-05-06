<script lang="ts">
	import { type Snippet } from "svelte";
	import { type ToggleProps } from "../toggle";
	import Toggle from "../toggle/toggle.svelte";
	import { getItemContext, getVariantContext } from ".";

	let {
		children,
		variant,
		pressed,
		...restProps
	}: ToggleProps & { value: string; children: Snippet } = $props();

	const item = getItemContext()({ pressed });
	const ctxVariant = getVariantContext();
</script>

<Toggle builder={item} variant={variant ?? ctxVariant} {...restProps}>
	{@render children?.()}
</Toggle>
