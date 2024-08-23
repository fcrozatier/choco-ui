<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/base.svelte";
  import { Triggerable } from "$lib/mixins/triggerable.svelte";
  import { fly } from "svelte/transition";

  const Disclosure = class extends Triggerable(ChocoBase) {
    constructor() {
      super();
      // The mixin does the heavy lifting, we just have to configure it
      this.initTriggerable({
        control: { "aria-expanded": "false" },
        target: { hidden: true },
        active: false,
        toggle: "click",
      });

      // We can always add more attributes or new actions to a Choco class
      const targetId = "123";
      this.extendAttributes({ "aria-controls": targetId });
      this.target.extendAttributes({ id: "123" });
    }
  };

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
