<script lang="ts">
  import { ChocoBase } from "$lib/base.svelte";
  import { choco } from "$lib/choco.js";

  const base = new ChocoBase({
    hidden: false,
    role: "button",
    "aria-selected": "true",
  });
</script>

<span use:choco={base}>hello</span>
