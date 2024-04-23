<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { type ToggleProps } from "../toggle";
	import Toggle from "../toggle/toggle.svelte";
	import type { CreateToggleGroupItem } from "$lib/builders/toggle-group/toggle-group.svelte";

	let {
		children,
		variant,
		pressed,
		...restProps
	}: ToggleProps & { value: string; children: Snippet } = $props();

	const item = getContext<CreateToggleGroupItem>("choco-createItem")({ pressed });
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<Toggle builder={item} variant={variant ?? ctxVariant} {...restProps}>
	{@render children?.()}
</Toggle>
