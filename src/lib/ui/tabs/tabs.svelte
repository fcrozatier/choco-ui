<script lang="ts">
	import { createTabs, type CreateTabs } from "$lib/builders/tabs/tabs.svelte";
	import { setContext, type Snippet } from "svelte";

	let {
		class: className,
		activateOnFocus,
		orientation,
		loop,
		value,
		children,
	}: CreateTabs & {
		class?: string;
		children: Snippet;
	} = $props();

	const { action, createPanel, createTab } = createTabs({
		value,
		loop,
		activateOnFocus,
		orientation,
	});

	setContext("choco-tablist", action);
	setContext("choco-tab", createTab);
	setContext("choco-panel", createPanel);
</script>

<div class={className}>
	{@render children()}
</div>
