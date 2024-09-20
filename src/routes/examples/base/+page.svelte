<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "chocobytes/blocks/base.svelte.js";

  const base = new ChocoBase({
    hidden: false,
    role: "button",
    "aria-selected": "true",
  });
</script>

<span use:choco={base}>hello</span>
