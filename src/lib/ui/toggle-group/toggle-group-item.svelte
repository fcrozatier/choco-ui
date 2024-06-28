<script lang="ts">
	import { type ToggleProps } from "../toggle/index.js";
	import Toggle from "../toggle/toggle.svelte";
	import { getItemContext, getVariantContext } from "./index.js";

	let { children, variant, active = $bindable(false), ...restProps }: ToggleProps = $props();

	const builder = getItemContext();
	const ctxVariant = getVariantContext();
</script>

<Toggle {builder} variant={variant ?? ctxVariant} bind:active {...restProps}>
	{@render children?.()}
</Toggle>
