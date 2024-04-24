<script lang="ts">
	import { createTabs, type TabsOptions } from "$lib/builders/tabs/tabs.svelte";
	import { setContext, type Snippet } from "svelte";

	let {
		class: className,
		orientation = "horizontal",
		// Focus options
		activateOnFocus = true,
		loop = true,
		onFocus,
		//
		managed = true,
		value,
		children,
	}: TabsOptions & {
		class?: string;
		children: Snippet;
	} = $props();

	const { createPanel, createTab } = createTabs({
		value,
		activateOnFocus,
		onFocus,
		loop,
		managed,
		orientation,
	});

	setContext("choco-tab", createTab);
	setContext("choco-panel", createPanel);
</script>

<div class={className}>
	{@render children()}
</div>
