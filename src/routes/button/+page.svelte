<script lang="ts">
	import { t } from "$lib/ui/theme";

	let h;
</script>

<button class={t.btn()} bind:clientHeight={h}>I'm a default button</button>
<p>
	Use all the svelte bindings: here clientHeight = {h}
</p>

<button class={t.btn({ variant: "outline" })} bind:clientHeight={h}>I'm an outline button</button>

<button class={t.btn({ variant: "ghost", size: "lg" })} bind:clientHeight={h}
	>I'm a ghost lg button</button
>
