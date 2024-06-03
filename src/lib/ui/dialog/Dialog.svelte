<script lang="ts">
	import { clickOutside } from "$lib/actions/clickOutside";
	import type { DialogProps } from "$lib/components/dialog.svelte";
	import { onMount } from "svelte";

	let { snippet, onclose, class: className, role, closeOnOutsideClick }: DialogProps = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	onMount(() => {
		dialog?.showModal();
	});
</script>

<dialog {role} {onclose} class={className} bind:this={dialog} aria-modal="true">
	<form
		method="dialog"
		use:clickOutside={() => {
			if (closeOnOutsideClick) {
				dialog?.close();
			}
		}}
	>
		{@render snippet?.()}
	</form>
</dialog>
