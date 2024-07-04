<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { Tabs } from "$lib/headless/tabs.svelte";
	import * as TabsUI from "$lib/ui/tabs/index.js";

	const { createItem, tablist } = new Tabs();

	const items = [
		{ item: createItem({ value: "first", active: true }), label: "label 1", content: "panel 1" },
		{ item: createItem({ value: "second" }), label: "label 2", content: "panel 2" },
		{ item: createItem({ value: "third" }), label: "label 3", content: "panel 3" },
	];
</script>

<section>
	<div aria-label="Select a tab">
		<div {...tablist.attributes}>
			{#each items as { item, label }}
				<button use:choco={item}>{label}</button>
			{/each}
		</div>
		{#each items as { item, content }}
			<div use:choco={item.target}>{content}</div>
		{/each}
	</div>
</section>

<section>
	<button>before</button>

	<TabsUI.Root value="password" focus={{ loop: true }} class="w-md">
		<TabsUI.TabList aria-label="Update your account">
			<TabsUI.Tab value="account">Account</TabsUI.Tab>
			<TabsUI.Tab value="password">Password</TabsUI.Tab>
		</TabsUI.TabList>

		<TabsUI.Panel value="account">Make changes to your account <button>here</button>.</TabsUI.Panel>
		<TabsUI.Panel value="password">Change your password here.</TabsUI.Panel>
	</TabsUI.Root>

	<button>after</button>
</section>
