<script context="module" lang="ts">
	import Dialog from "./Dialog.svelte";

	type DialogProps = {
		class?: string;
		role?: (typeof role)["dialog" | "alertdialog"];
		preventScroll?: boolean;
		onclose?: (ev: HTMLElementEventMap["close"]) => void;
		children: Snippet;
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
	import type { role } from "$lib/utils/roles";
	import { mount, onMount, unmount, type Snippet } from "svelte";

	let { children, class: className, role, onclose }: DialogProps = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	onMount(() => {
		dialog?.showModal();
		document.addEventListener(
			"wheel",
			(e) => {
				e.preventDefault();
				e.stopPropagation();
			},
			{ passive: false },
		);

		return () => {
			document.removeEventListener("scroll", (e) => e.preventDefault());
		};
	});
</script>

<dialog {role} {onclose} class={className} bind:this={dialog} aria-modal="true">
	<form method="dialog">
		{#if children}
			{@render children()}
		{/if}
	</form>
</dialog>
