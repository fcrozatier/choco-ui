<script lang="ts">
	import { createTabs, type CreateTabs } from "$lib/builders/tabs/tabs.svelte";
	import { cn } from "$lib/utils/styles";
	import { setContext, type Snippet } from "svelte";

	let {
		class: className,
		activateOnFocus,
		orientation,
		loop,
		value,
		tablist,
		children,
	}: CreateTabs & { class?: string; tablist: Snippet; children: Snippet } = $props();

	const { action, createPanel, createTab } = createTabs({
		value,
		loop,
		activateOnFocus,
		orientation,
	});

	setContext("choco-panel", createPanel);
	setContext("choco-tab", createTab);
</script>

<div class={className}>
	<div
		class={cn(
			"bg-muted text-muted-foreground flex h-10 items-center justify-center rounded-md p-1",
		)}
		use:action
	>
		{@render tablist()}
	</div>
	{@render children()}
</div>
