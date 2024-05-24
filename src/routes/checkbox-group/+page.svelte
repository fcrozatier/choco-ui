<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { CheckboxGroup } from "$lib/components/checkbox-group.svelte";

	const checkboxGroup = new CheckboxGroup();
	const items = [
		{ item: checkboxGroup.createItem({ value: "Lettuce" }) },
		{ item: checkboxGroup.createItem({ value: "Tomato" }) },
		{ item: checkboxGroup.createItem({ value: "Mustard" }) },
		{ item: checkboxGroup.createItem({ value: "Sprout" }) },
	];
</script>

<fieldset>
	<legend> Sandwich Condiments</legend>
	<label class="select-none">
		<input use:choco={checkboxGroup.root} />
		Choose condiment:
	</label>

	<ul class="ml-4">
		{#each items as item}
			<li>
				<label class="select-none">
					<input use:choco={item.item} />
					{item.item.value}
				</label>
			</li>
		{/each}
	</ul>
</fieldset>

{checkboxGroup.active}
{checkboxGroup.triState}
