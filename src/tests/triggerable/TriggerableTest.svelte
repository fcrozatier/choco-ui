<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";
  import { Triggerable } from "$lib/mixins/triggerable.svelte";

  const Control = class extends Triggerable(ChocoBase) {};

  const control = new Control();
  control.initTriggerable({
    control: { "aria-expanded": "false" },
    target: { "data-open": "false" },
    active: false,
    toggle: "click",
  });
</script>

<button use:choco={control} data-testid="trigger">button</button>

<div use:choco={control.target} data-testid="target">div</div>
