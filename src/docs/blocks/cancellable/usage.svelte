<script lang="ts">
  import { Cancellable } from "$lib/blocks/cancellable.svelte.js";
  import { choco } from "chocobytes/index.js";

  const cancellable = new Cancellable();
</script>

<button use:choco={cancellable}>Improved</button>
