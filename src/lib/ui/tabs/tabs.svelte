<script lang="ts">
	import { createTabs } from "$lib/builders/tabs/tabs.svelte";
	import { cn } from "$lib/utils/styles";
	import { setContext, type Snippet } from "svelte";

	let {
		class: className,
		value,
		tablist,
		children,
	}: { class: string; value?: string; tablist: Snippet; children: Snippet } = $props();

	const { action, createPanel, createTab } = createTabs({ value });

	setContext("choco-panel", createPanel);
	setContext("choco-tab", createTab);
</script>

<div>
	<div
		class={cn(
			"bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
			className,
		)}
		use:action
	>
		{@render tablist()}
	</div>
	{@render children()}
</div>
