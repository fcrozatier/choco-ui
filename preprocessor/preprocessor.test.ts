import { expect, test } from "vitest";
import { chocoPreprocess } from "./index";

const { markup } = chocoPreprocess();

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
])("choco preprocessor works with %s", (_, before, after) => {
  expect(markup({ content: before }).code).toBe(after);
});
