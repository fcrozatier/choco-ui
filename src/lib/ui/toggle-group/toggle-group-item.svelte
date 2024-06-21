<script lang="ts">
	import { getItemContext, getVariantContext } from ".";
	import { type ToggleProps } from "../toggle";
	import Toggle from "../toggle/toggle.svelte";

	let { children, variant, active = $bindable(false), ...restProps }: ToggleProps = $props();

	const builder = getItemContext();
	const ctxVariant = getVariantContext();
</script>

<Toggle {builder} variant={variant ?? ctxVariant} bind:active {...restProps}>
	{@render children?.()}
</Toggle>
