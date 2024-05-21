<script lang="ts">
	import * as Accordion from "$lib/ui/accordion";
</script>

<Accordion.Root class="max-w-xs" focus={{ exclusive: true, loop: true }}>
	<Accordion.Item value="item-1">
		{#snippet header()}
			Is it accessible?
		{/snippet}

		Yes. It adheres to the WAI-ARIA design pattern.
	</Accordion.Item>
	<Accordion.Item value="item-2">
		{#snippet header()}
			Is it styled?
		{/snippet}

		Yes. It comes with default styles that matches the other components' aesthetic.
	</Accordion.Item>
	<Accordion.Item value="item-3">
		{#snippet header()}
			Is it animated?
		{/snippet}

		Yes. It's animated by default, but you can disable it if you prefer.
	</Accordion.Item>
</Accordion.Root>
