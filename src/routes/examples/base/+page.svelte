<script lang="ts">
  import { ChocoBase } from "$lib/headless/base.svelte";

  const base = new ChocoBase({
    hidden: false,
    role: "button",
    "aria-selected": "true",
  });
</script>

<span {...base.attributes}>hello</span>
