<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";

  const base = new ChocoBase({
    hidden: false,
    role: "button",
    "aria-selected": "true",
  });
</script>

<span use:choco={base}>hello</span>
