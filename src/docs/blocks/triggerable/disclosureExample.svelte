<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Triggerable } from "$lib/blocks/triggerable.svelte.js";
  import { fly } from "svelte/transition";

  class Disclosure extends Triggerable {
    constructor() {
      // We just have to configure the control and target booleanish states
      super({
        control: { "aria-expanded": "false" },
        target: { hidden: true },
        active: false,
        // here we only want to toggle on click
        toggle: "click",
      });

      // We can always add more attributes or new actions to a Choco class
      const targetId = "123";
      this.target.extendAttributes({ id: targetId });
      this.extendAttributes({ "aria-controls": targetId });
    }
  }

  const disclosure = new Disclosure();
</script>

<div class="my-8 grid grid-cols-2 items-center justify-center gap-2 text-center">
  <button class="cursor-pointer py-2 px-4 outline" use:choco={disclosure}>control</button>

  {#if disclosure.active}
    <span class="text-coral" transition:fly={{ y: 100 }} use:choco={disclosure.target}>target</span>
  {/if}
</div>

<!-- Just to see what's going on -->
<div class="grid grid-cols-2">
  <pre>{JSON.stringify(disclosure.attributes, null, 2)}</pre>
  <pre>{JSON.stringify(disclosure.target.attributes, null, 2)}</pre>
</div>
