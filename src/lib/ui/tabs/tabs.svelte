<script lang="ts">
	import { createTabs, type CreateTabs } from "$lib/builders/tabs/tabs.svelte";
	import { setContext, type Snippet } from "svelte";

	let {
		class: className,
		orientation,
		focus,
		value,
		children,
	}: CreateTabs & {
		class?: string;
		children: Snippet;
	} = $props();

	const { createPanel, createTab } = createTabs({
		value,
		focus,
		orientation,
	});

	setContext("choco-tab", createTab);
	setContext("choco-panel", createPanel);
</script>

<div class={className}>
	{@render children()}
</div>
