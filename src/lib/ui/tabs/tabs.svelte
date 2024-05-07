<script lang="ts">
	import { type TabsOptions } from "$lib/builders/tabs/tabs.svelte";
	import { Tabs } from "$lib/components/tabs.svelte";
	import { trimUndefined } from "@fcrozatier/ts-helpers";
	import { type Snippet } from "svelte";
	import { setTabsContext } from ".";

	let {
		class: className,
		activateOnFocus,
		orientation,
		value,
		loop,
		onFocus,
		children,
	}: TabsOptions & {
		class?: string;
		children: Snippet;
	} = $props();

	const tabs = new Tabs(
		trimUndefined({
			activateOnFocus,
			orientation,
			onFocus,
			value,
			loop,
		}),
	);

	setTabsContext(tabs);
</script>

<div class={className}>
	{@render children()}
</div>
