<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "chocobytes/headless/toggle.svelte.js";

  let active = $state(true);

  const toggle = new ToggleButton({ active: () => active, setActive: (v) => (active = v) });
</script>

<label>
  <span>bind</span>
  <input type="checkbox" bind:checked={active} />
</label>

<p class="text-center">Indulge in Chocolate?</p>
<p class="flex justify-center">
  <button class="aria-pressed:text-dark py-2 px-4 outline aria-pressed:bg-white" use:choco={toggle}
    >Indulge</button
  >
</p>

<p>
  {#if active}
    Indulgent mode activated! Go all out with a rich chocolate cake, double chocolate cookies, or
    that extra-large chocolate bar.
  {:else}
    Keeping it minimal for now. Maybe just a tiny square of dark chocolate or a light chocolate
    snack
  {/if}
</p>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
