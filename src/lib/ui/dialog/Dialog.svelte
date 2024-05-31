<script context="module" lang="ts">
	import Dialog from "./Dialog.svelte";

	type DialogProps = DialogOptions & {
		class?: string;
		children: Snippet;
		onclose?: (ev: HTMLElementEventMap["close"]) => void;
	};

	export function showModal(props: DialogProps) {
		return new Promise((resolve) => {
			const dialog = mount(Dialog, {
				target: document.body,
				props: {
					...props,
					onclose: (e) => {
						props?.onclose?.(e);
						resolve((e.currentTarget as HTMLDialogElement)?.returnValue);
						unmount(dialog);
					},
				},
			});
		});
	}
</script>

<script lang="ts">
	import type { DialogOptions } from "$lib/components/dialog.svelte";
	import { mount, onMount, unmount, type Snippet } from "svelte";

	let { children, class: className, role, onclose }: DialogProps = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	onMount(() => {
		dialog?.showModal();
	});
</script>

<dialog {role} {onclose} class={className} bind:this={dialog}>
	{#if children}
		{@render children()}
	{:else}{/if}
</dialog>
