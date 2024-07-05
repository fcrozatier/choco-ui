<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { t } from "$lib/components/theme.js";
  import { Toggle } from "$lib/components/toggle/index.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";
  import { bind } from "$lib/plugin/bind.js";

  let disabled = $state(false);
  let active = $state(true);

  const toggle = new ToggleButton(bind({ active }, ["active"]));

  const toggle2 = new ToggleButton({
    active: false,
  });

  const toggle3 = new ToggleButton({ active: true });
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
  <button use:choco={toggle} {disabled}> press</button>
</p>
<p>
  I'm {toggle.active ? "" : "not"} pressed
</p>

<h2>Styled</h2>

<button
  use:choco={toggle2}
  aria-label="Toggle italic"
  class="text-magnum-800 hover:bg-magnum-100 aria-pressed:bg-magnum-200 aria-pressed:text-magnum-900 grid h-9 w-9
	place-items-center items-center justify-center rounded-md bg-white text-base
    leading-4 shadow-lg
    disabled:cursor-not-allowed"
>
  I
</button>

<Toggle variant="outline" bind:active>toggle</Toggle>

<button class={t.toggle()} use:choco={toggle3}>toggle</button>
