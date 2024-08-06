import { expect, test } from "vitest";
import { expandSvelteFile } from "./plugin.js";
import { expand } from "./transformer.js";

// TS files
test.each([
  [
    "shorthand",
    "f(bind({ active }, ['active']));",
    "f({ get active() { return active; }, set active(v) { active = v; } });",
  ],
  [
    "longhand",
    "f(bind({ active: activation }, ['active']));",
    "f({ get active() { return activation; }, set active(v) { activation = v; } });",
  ],
  [
    "member expression",
    "f(bind({ active: opts.active }, ['active']));",
    "f({ get active() { return opts.active; }, set active(v) { opts.active = v; } });",
  ],
  ["bind method", "this.method.bind(this);", "this.method.bind(this);"],
  ["getters only", "f(bind({ open }));", "f({ get open() { return open; } });"],
  [
    "literal",
    "f(bind({ 'aria-current': current }, ['active']));",
    'f({ get "aria-current"() { return current; } });',
  ],
  [
    "mix",
    "f(bind({ open, active, 'aria-current': current }, ['active']))",
    'f({ get open() { return open; }, get active() { return active; }, set active(v) { active = v; }, get "aria-current"() { return current; } });',
  ],
])("expand bind with %s", async (_desc, before, after) => {
  const expanded = expand({
    content: before,
    filename: "file.svelte.ts",
  });

  expect(expanded.trim()).toEqual(after);
});

// Svelte files
test.each([
  [
    "shorthand",
    "<script lang='ts'>f(bind({ active }, ['active']))</script>",
    `<script lang='ts'>f({ get active() { return active; }, set active(v) { active = v; } });
</script>`,
  ],
  [
    "longhand",
    "<script lang='ts'>f(bind({ active: activation }, ['active']));</script>",
    `<script lang='ts'>f({ get active() { return activation; }, set active(v) { activation = v; } });
</script>`,
  ],
  [
    "member expression",
    "<script lang='ts'>f(bind({ active: opts.active }, ['active']));</script>",
    `<script lang='ts'>f({ get active() { return opts.active; }, set active(v) { opts.active = v; } });
</script>`,
  ],
  [
    "full example",
    `<script lang='ts'>
			let active = $state(true);
			const toggle = new ToggleButton(bind({ active }, ['active']));
		</script>
		hello`,
    `<script lang='ts'>let active = $state(true);
const toggle = new ToggleButton({ get active() { return active; }, set active(v) { active = v; } });
</script>
		hello`,
  ],
  [
    "leaves Highlighter component",
    `<script>import Highlighter from 'path'</script>
    <Highlighter code={\`<script lang='ts'>f(bind({ active }, ['active']))</script>\`} lang="svelte"></Highlighter>`,
    null,
  ],
])("expand bind with %s", async (_desc, before, after) => {
  expect(expandSvelteFile({ content: before, filename: "file.svelte" })).toEqual(after);
});
