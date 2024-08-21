<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";

  const toggle = new ToggleButton();
</script>

<p>
  <!-- Just use the choco action and you're done -->
  <button use:choco={toggle} onclick={() => console.log("still toggling")}>
    I'm {toggle.active ? "" : "not"} pressed
  </button>
</p>
