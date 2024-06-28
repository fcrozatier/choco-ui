<script lang="ts">
	import { Tabs, type TabsOptions } from "$lib/components/tabs.svelte";
	import { trimUndefined } from "@fcrozatier/ts-helpers";
	import { type Snippet } from "svelte";
	import { setTabsContext } from "./index.js";

	let {
		class: className,
		orientation,
		value,
		focus,
		children,
	}: TabsOptions & {
		class?: string;
		children: Snippet;
	} = $props();

	const tabs = new Tabs(
		trimUndefined<TabsOptions>({
			orientation,
			value,
			focus,
		}),
	);

	setTabsContext(tabs);
</script>

<div class={className}>
	{@render children()}
</div>
