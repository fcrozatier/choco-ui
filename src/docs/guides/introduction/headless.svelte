<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "chocobytes/headless/toggle.svelte.js";

  const toggle = new ToggleButton();
</script>

<p>
  <!-- Just use the choco action and you're done -->
  <button
    use:choco={toggle}
    onclick={() => console.log("still toggling")}
    class="aria-pressed:text-dark rounded border border-white py-2 px-4 aria-pressed:bg-white"
  >
    I'm {toggle.active ? "" : "not"} pressed
  </button>
</p>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
