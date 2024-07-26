<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte.js";

  let checked = $state(false);

  const toggle = new ToggleButton({
    get active() {
      return checked;
    },
    set active(v) {
      checked = v;
    },
  });
</script>

<p>
  <label>
    <input type="checkbox" bind:checked />
    active
  </label>
</p>

<button use:choco={toggle}>Click</button>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
