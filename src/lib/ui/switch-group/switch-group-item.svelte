<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { toggleVariants, type ToggleProps } from "../toggle";
	import type { CreateSwitchGroupItem } from "$lib/builders/switch-group/switch-group.svelte";
	import type { CreateSwitch } from "$lib/builders/switch/switch.svelte";

	let {
		class: className,
		size,
		variant,
		checked,
		children,
		...restProps
	}: ToggleProps & CreateSwitch & { value: string; children: Snippet } = $props();

	const item = getContext<CreateSwitchGroupItem>("choco-createItem")({ checked });
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<button
	use:item.action
	class={toggleVariants({ variant: variant ?? ctxVariant, size, className })}
	{...restProps}
>
	{@render children?.()}
</button>
