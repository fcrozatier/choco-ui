<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Triggerable } from "$lib/mixins/triggerable.svelte";

  const trigger = new Triggerable({
    control: { "aria-expanded": "false" },
    target: { "data-open": "false" },
    active: false,
    toggle: "click",
  });
</script>

<button use:choco={trigger} data-testid="trigger">button</button>

<div use:choco={trigger.target} data-testid="target">div</div>
