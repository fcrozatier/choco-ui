<script lang="ts">
	import Tooltip from "$lib/ui/tooltip/tooltip.svelte";

	let show = $state(false);
</script>

<p>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi autem ipsum totam similique
	tenetur corrupti officia, temporibus eaque quisquam consectetur unde assumenda placeat nulla alias
	vel qui pariatur eos doloremque?
</p>

<label for="checkbox">show tooltip</label>
<input id="checkbox" type="checkbox" bind:checked={show} />

<span class="">
	HTML
	<Tooltip bind:open={show} position="right">Hyper Text Markup Language</Tooltip>
</span>
