<script lang="ts">
	import type { CreatePanel } from "$lib/builders/tabs/tabs.svelte";
	import { getContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		value,
		...rest
	}: HTMLAttributes<HTMLElement> & { value: string; children: Snippet } = $props();

	const panel = getContext<CreatePanel>("choco-panel");
</script>

<div use:panel={{ value }} class={className} {...rest}>
	{@render children()}
</div>
