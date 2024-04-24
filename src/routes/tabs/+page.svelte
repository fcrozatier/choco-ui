<script lang="ts">
	import { createTabs } from "$lib/builders/tabs/tabs.svelte";
	import * as Tabs from "$lib/ui/tabs";

	const { createTab, createPanel } = createTabs({ activateOnFocus: true });
</script>

{#snippet tab(value, label)}
	<button use:createTab={{ value }}>{label}</button>
{/snippet}

{#snippet panel(value, content)}
	<div use:createPanel={{ value }}>{content}</div>
{/snippet}

<section>
	<div aria-label="Select a tab">
		<div>
			{@render tab("first", "Tab 1")}
			{@render tab("second", "Tab 2")}
			{@render tab("third", "Tab 3")}
			{@render tab("fourth", "Tab 4")}
		</div>
		{@render panel("first", "Panel 1")}
		{@render panel("second", "Panel 2")}
		{@render panel("third", "Panel 3")}
		{@render panel("fourth", "Panel 4")}
	</div>
</section>

<section>
	<button>before</button>

	<Tabs.Root value="" loop={true} activateOnFocus={true} class="w-md">
		<Tabs.TabList aria-label="Update your account">
			<Tabs.Tab value="account">Account</Tabs.Tab>
			<Tabs.Tab value="password">Password</Tabs.Tab>
		</Tabs.TabList>

		<Tabs.Panel value="account">Make changes to your account <button>here</button>.</Tabs.Panel>
		<Tabs.Panel value="password">Change your password here.</Tabs.Panel>
	</Tabs.Root>

	<button>after</button>
</section>
