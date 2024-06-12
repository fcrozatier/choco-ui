import { expect, test } from "vitest";
import plugin from "./plugin";

// TS files
test.each([
	[
		"shorthand",
		"bind({ active }, ['active'])",
		"bind({ get active(){return active}, set active(v){active=v} }, ['active'])",
	],
	[
		"longhand",
		"bind({ active: activation }, ['active'])",
		"bind({ get active(){return activation}, set active(v){activation=v} }, ['active'])",
	],
	[
		"member expression",
		"bind({ active: opts.active }, ['active'])",
		"bind({ get active(){return opts.active}, set active(v){opts.active=v} }, ['active'])",
	],
])("bind expansion with %s", async (_, before, after) => {
	expect(plugin({ content: before, filename: "something.svelte.ts" }).code).toBe(after);
});

// Svelte files
test.each([
	[
		"shorthand",
		"<script lang='ts'>bind({ active }, ['active'])</script>",
		"<script lang='ts'>bind({ get active(){return active}, set active(v){active=v} }, ['active'])</script>",
	],
	[
		"longhand",
		"<script lang='ts'>bind({ active: activation }, ['active'])</script>",
		"<script lang='ts'>bind({ get active(){return activation}, set active(v){activation=v} }, ['active'])</script>",
	],
	[
		"member expression",
		"<script lang='ts'>bind({ active: opts.active }, ['active'])</script>",
		"<script lang='ts'>bind({ get active(){return opts.active}, set active(v){opts.active=v} }, ['active'])</script>",
	],
])("bind expansion with %s", async (_, before, after) => {
	expect(plugin({ content: before, filename: "something.svelte" }).code).toBe(after);
});
