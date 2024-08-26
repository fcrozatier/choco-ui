<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte.js";

  const toggle = new ToggleButton();
</script>

<p>
  <!-- The shorthand syntax... -->
  <button use:choco={toggle}> Click me. </button>
  <span>Active: {toggle.active}</span>
</p>

<p>
  <!-- ...is expanded into this using the preprocessor -->
  <button {...toggle.attributes} use:toggle.action> Click me. </button>
  <span>Active: {toggle.active}</span>
</p>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>

<style>
  button {
    cursor: pointer;
    opacity: 60%;
  }
</style>
