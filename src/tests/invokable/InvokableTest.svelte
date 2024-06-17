<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { ChocoBase } from "$lib/components/base.svelte";
	import { Togglable } from "$lib/mixins/togglable.svelte";
	import { Triggerable } from "$lib/mixins/triggerable.svelte";

	const Control = class extends Triggerable(Togglable(ChocoBase)) {};

	const control = new Control();
	control.initTriggerable({
		control: { "aria-expanded": "false" },
		target: { "data-open": "false" },
		active: false,
		toggle: "click",
	});
</script>

<button use:choco={control} data-testid="invoker">button</button>

<div use:choco={control.target} data-testid="target">div</div>
