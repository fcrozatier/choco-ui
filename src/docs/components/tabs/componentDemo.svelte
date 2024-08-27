<script lang="ts">
  import * as Tabs from "$lib/components/tabs/index.js";
</script>

<Tabs.Root value="password" focus={{ loop: true }} class="mx-auto w-md">
  <Tabs.TabList aria-label="Update your account">
    <Tabs.Tab value="account">Account</Tabs.Tab>
    <Tabs.Tab value="password">Password</Tabs.Tab>
  </Tabs.TabList>

  <Tabs.Panel value="account">Make changes to your account <button>here</button>.</Tabs.Panel>
  <Tabs.Panel value="password">Change your password here.</Tabs.Panel>
</Tabs.Root>
