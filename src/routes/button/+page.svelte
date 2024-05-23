<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { Button } from "$lib/components/button.svelte";
	import { t } from "$lib/ui/theme";

	let h;

	const btn = new Button();
</script>

<button class={t.btn()} bind:clientHeight={h}>I'm a default button</button>
<p>
	Use all the svelte bindings: here clientHeight = {h}
</p>

<button class={t.btn({ variant: "outline" })} bind:clientHeight={h}>I'm an outline button</button>

<button class={t.btn({ variant: "ghost", size: "lg" })} bind:clientHeight={h}
	>I'm a ghost lg button</button
>

<p>
	<button use:choco={btn}>Improved button</button>
</p>
