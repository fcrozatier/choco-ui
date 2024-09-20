<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/mixins/cancellable.svelte";

  const btn = new Cancellable();
</script>

<button use:choco={btn}>Improved button</button>
<a href="/" data-testid="target">Other target</a>
