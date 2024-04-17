<script lang="ts">
	import * as Tabs from "$lib/ui/tabs";
</script>

<button>before</button>

<Tabs.Root value="account" class="w-[400px]">
	{#snippet tablist()}
		<Tabs.Tab value="account">Account</Tabs.Tab>
		<Tabs.Tab value="password">Password</Tabs.Tab>
	{/snippet}
	<Tabs.Panel value="account">Make changes to your account here.</Tabs.Panel>
	<Tabs.Panel value="password">Change your password here.</Tabs.Panel>
</Tabs.Root>

<button>after</button>
