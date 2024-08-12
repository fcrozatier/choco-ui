<script lang="ts">
  import * as TabsUI from "$lib/components/tabs/index.js";
  import type { Component } from "svelte";
  import Highlighter from "./Highlighter.svelte";

  let { code, Component, value }: { code: string; Component: Component; value: "code" | "result" } =
    $props();
</script>

<TabsUI.Root {value} focus={{ loop: true }}>
  <TabsUI.TabList aria-label="Update your code">
    <TabsUI.Tab value="code">code</TabsUI.Tab>
    <TabsUI.Tab value="result">result</TabsUI.Tab>
  </TabsUI.TabList>

  <TabsUI.Panel value="code">
    <Highlighter {code} lang="svelte"></Highlighter>
  </TabsUI.Panel>
  <TabsUI.Panel class="bg-dark-muted mx-auto overflow-x-auto rounded p-10" value="result">
    <Component />
  </TabsUI.Panel>
</TabsUI.Root>
