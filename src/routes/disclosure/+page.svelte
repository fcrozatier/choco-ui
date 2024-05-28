<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { Disclosure } from "$lib/components/disclosure.svelte";
	import { DisclosureUI } from "$lib/ui/disclosure";

	const disclosure = new Disclosure();
</script>

<button class="cursor-pointer" use:choco={disclosure}>
	<span
		class={`inline-flex size-2 ${disclosure.active ? "rotate-90" : ""} origin-center items-center justify-center transition-transform duration-200`}
	>
		&rsaquo;
	</span>
	When is the deadline?
</button>

{#if disclosure.active}
	<div>There is no deadline, ship when you are ready!</div>
{/if}

<DisclosureUI>
	{#snippet header()}
		When is the deadline?
	{/snippet}
	<div>There is no deadline, ship when you are ready!</div>
</DisclosureUI>
