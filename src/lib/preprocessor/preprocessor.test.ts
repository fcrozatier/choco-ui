import preprocess from "./index";
import { expect, test } from "vitest";

const { markup } = preprocess();

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
	expect(await markup?.({ content: before })?.code).toBe(after);
});
