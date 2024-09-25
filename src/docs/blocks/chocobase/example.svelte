<script lang="ts">
  import { ChocoBase } from "$lib/blocks/base.svelte.js";
  import { addListener } from "chocobytes/actions/addListener.js";
  import { choco } from "chocobytes/index.js";

  // Here we constrain `base` to be used on buttons only
  const base = new ChocoBase<"button">({ disabled: false, value: "ok" });

  // Subclasses of `ChocoBase` can add aria attributes in this way
  base.extendAttributes({
    "data-my-attribute": "custom",
  });

  // Subclasses of `ChocoBase` can add specialized behavior
  base.extendActions((node) => console.log("hello", node));

  // `addListener` is a convenient helper to create an action from a listener
  // with cleanup managed automatically
  base.extendActions(addListener("click", () => console.log("click")));
</script>

<button class="py-2 px-4 outline" use:choco={base}>Click and check console</button>

<pre>{JSON.stringify(base.attributes, null, 2)}</pre>
