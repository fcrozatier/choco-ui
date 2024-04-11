<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { type ToggleProps } from "../toggle";
	import Toggle from "../toggle/toggle.svelte";
	import type { CreateToggleGroupItem } from "$lib/builders/toggle-group/toggle-group.svelte";

	let {
		children,
		variant,
		value,
		...restProps
	}: ToggleProps & { value: string; children: Snippet } = $props();

	const item = getContext<CreateToggleGroupItem>("choco-createItem")();
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;

	item.value = value;
</script>

<Toggle builder={item.builder} variant={variant ?? ctxVariant} {...restProps}>
	{@render children?.()}
</Toggle>
