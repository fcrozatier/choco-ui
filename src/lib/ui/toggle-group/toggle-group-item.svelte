<script lang="ts">
	import { type Snippet } from "svelte";
	import { type ToggleProps } from "../toggle";
	import Toggle from "../toggle/toggle.svelte";
	import { getItemContext, getVariantContext } from ".";

	let { children, variant, ...restProps }: Omit<ToggleProps, "builder"> & { children: Snippet } =
		$props();

	const itemBuilder = getItemContext();
	const ctxVariant = getVariantContext();
</script>

<Toggle builder={itemBuilder} variant={variant ?? ctxVariant} {...restProps}>
	{@render children?.()}
</Toggle>
