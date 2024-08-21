<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Toggle } from "$lib/components/toggle/index.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";

  let disabled = $state(false);
  let active = $state(true);

  const toggle = new ToggleButton({
    active: () => active,
    setActive: (v) => {
      active = v;
    },
  });
</script>

<h1>Toggle</h1>

<label>
  <span>disable</span>
  <input type="checkbox" bind:checked={disabled} />
</label>

<label>
  <span>programmatic change</span>
  <input type="checkbox" bind:checked={active} />
</label>

<h2>Button</h2>

<p>
  <button class="rounded py-2 px-4 outline" use:choco={toggle} {disabled}> press</button>
</p>
<p>
  I'm {toggle.active ? "" : "not"} pressed
</p>

<h2>Styled</h2>

<Toggle variant="outline" bind:active>toggle</Toggle>
