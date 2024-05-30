<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { ChocoBase } from "$lib/components/base.svelte";
	import { Cancellable } from "$lib/components/cancellable.svelte";
	import { Togglable } from "$lib/mixins/togglable.svelte";

	class Button extends Cancellable(Togglable(ChocoBase)) {}
	const btn = new Button();
</script>

<p>
	<button use:choco={btn}>Improved button</button>
</p>
