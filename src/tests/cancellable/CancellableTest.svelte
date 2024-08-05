<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";
  import { Cancellable } from "$lib/mixins/cancellable.svelte";

  class Button extends Cancellable(ChocoBase) {}
  const btn = new Button();
</script>

<button use:choco={btn}>Improved button</button>
<a href="/" data-testid="target">Other target</a>
