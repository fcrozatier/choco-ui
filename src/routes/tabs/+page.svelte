<script lang="ts">
	import { Tabs } from "$lib/components/tabs.svelte";
	import * as TabsUI from "$lib/ui/tabs";

	const { createItem, createTablist } = new Tabs({ activateOnFocus: true });

	const items = [
		{ item: createItem({ value: "first", active: true }), label: "label 1", content: "panel 1" },
		{ item: createItem({ value: "second" }), label: "label 2", content: "panel 2" },
		{ item: createItem({ value: "third" }), label: "label 3", content: "panel 3" },
	];
</script>

<section>
	<div aria-label="Select a tab">
		<div {...createTablist().attributes}>
			{#each items as { item, label }}
				<button {...item.control.attributes} use:item.control.action>{label}</button>
			{/each}
		</div>
		{#each items as { item, content }}
			<button {...item.target.attributes} use:item.target.action>{content}</button>
		{/each}
	</div>
</section>

<section>
	<button>before</button>

	<TabsUI.Root value="password" loop={true} activateOnFocus={true} class="w-md">
		<TabsUI.TabList aria-label="Update your account">
			<TabsUI.Tab value="account">Account</TabsUI.Tab>
			<TabsUI.Tab value="password">Password</TabsUI.Tab>
		</TabsUI.TabList>

		<TabsUI.Panel value="account">Make changes to your account <button>here</button>.</TabsUI.Panel>
		<TabsUI.Panel value="password">Change your password here.</TabsUI.Panel>
	</TabsUI.Root>

	<button>after</button>
</section>
