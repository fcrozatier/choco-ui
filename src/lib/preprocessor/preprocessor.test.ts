import { expect, test } from "vitest";
import preprocess from "./index";

const { markup, script } = preprocess();

test.each([
	[
		"identifier",
		"<input use:choco={toggle} />",
		"<input {...toggle.attributes} use:toggle.action />",
	],
	[
		"object property",
		"<input use:choco={tabItem.control} />",
		"<input {...tabItem.control.attributes} use:tabItem.control.action />",
	],
	[
		"optional chaining",
		"<input use:choco={tabItem?.target} />",
		"<input {...tabItem?.target.attributes} use:tabItem?.target.action />",
	],
	[
		"function call",
		"<input use:choco={tabList()} />",
		"<input {...tabList().attributes} use:tabList().action />",
	],
])("choco preprocessor works with %s", async (_, before, after) => {
	expect(markup({ content: before }).code).toBe(after);
});

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
	expect(script({ content: before, markup: "", attributes: {} }).code).toBe(after);
});
