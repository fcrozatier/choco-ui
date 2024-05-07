<script lang="ts">
	import { type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getTabsContext } from ".";

	let {
		class: className,
		children,
		value,
		...rest
	}: HTMLAttributes<HTMLElement> & { value: string; children: Snippet } = $props();

	const tabItem = getTabsContext().items.find((i) => i.value === value);
</script>

<div {...tabItem?.target.attributes} use:tabItem?.target.action class={className} {...rest}>
	{@render children()}
</div>
