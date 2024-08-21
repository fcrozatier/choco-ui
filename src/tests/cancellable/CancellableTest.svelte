<script lang="ts">
  import { ChocoBase } from "$lib/base.svelte.js";
  import { choco } from "$lib/choco.js";
  import { Cancellable } from "$lib/mixins/cancellable.svelte";

  class Button extends Cancellable(ChocoBase) {}
  const btn = new Button();
</script>

<button use:choco={btn}>Improved button</button>
<a href="/" data-testid="target">Other target</a>
