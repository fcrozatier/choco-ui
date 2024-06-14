import { expandMacro } from "create-choco/plugin";
import { expect, test } from "vitest";

// TS files
test.each([
	[
		"shorthand",
		"bind({ active }, ['active'])",
		"{ get active(){return active}, set active(v){active=v} }",
	],
	[
		"longhand",
		"bind({ active: activation }, ['active'])",
		"{ get active(){return activation}, set active(v){activation=v} }",
	],
	[
		"member expression",
		"bind({ active: opts.active }, ['active'])",
		"{ get active(){return opts.active}, set active(v){opts.active=v} }",
	],
	["bind method", "this.method.bind(this)", "this.method.bind(this)"],
	["getters only", "bind({ open })", "{ get open(){return open} }"],
	[
		"getters on literal props",
		"bind({ 'aria-current': current }, ['active'])",
		"{ get 'aria-current'(){return current} }",
	],
	[
		"mix",
		"bind({ open, active, 'aria-current': current }, ['active'])",
		"{ get open(){return open}, get active(){return active}, set active(v){active=v}, get 'aria-current'(){return current} }",
	],
])("expand bind with %s", async (_desc, before, after) => {
	expect(expandMacro({ content: before, filename: "file.svelte.ts" })?.code).toBe(after);
});

// Svelte files
test.each([
	[
		"shorthand",
		"<script lang='ts'>bind({ active }, ['active'])</script>",
		"<script lang='ts'>{ get active(){return active}, set active(v){active=v} }</script>",
	],
	[
		"longhand",
		"<script lang='ts'>bind({ active: activation }, ['active'])</script>",
		"<script lang='ts'>{ get active(){return activation}, set active(v){activation=v} }</script>",
	],
	[
		"member expression",
		"<script lang='ts'>bind({ active: opts.active }, ['active'])</script>",
		"<script lang='ts'>{ get active(){return opts.active}, set active(v){opts.active=v} }</script>",
	],
	[
		"full example",
		`<script lang='ts'>
			let active = $state(true);
			const toggle = new ToggleButton(bind({ active }, ['active']));
		</script>
		hello`,
		`<script lang='ts'>
			let active = $state(true);
			const toggle = new ToggleButton({ get active(){return active}, set active(v){active=v} });
		</script>
		hello`,
	],
])("expand bind with %s", async (_desc, before, after) => {
	expect(expandMacro({ content: before, filename: "file.svelte" })?.code).toBe(after);
});
