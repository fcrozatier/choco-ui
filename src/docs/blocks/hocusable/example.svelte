<script lang="ts">
  import { Hocusable } from "chocobytes/blocks/hocusable.svelte.js";
  import { choco } from "chocobytes/index.js";
  import { nanoId } from "chocobytes/utils/index.js";
  import { role } from "chocobytes/utils/roles.js";

  export class Tooltip extends Hocusable<"generic"> {
    constructor(options?: { active: boolean }) {
      const active = options?.active ?? false;

      super({
        active,
        // We only toggle a `data-open` attribute on the target
        target: { "data-open": active },
      });

      const id = "tooltip-" + nanoId();

      // And extend the attributes for accessibility
      this.extendAttributes({
        "aria-describedby": id,
      });

      this.target.extendAttributes({
        id,
        inert: true,
        role: role.tooltip,
      });
    }
  }

  const tooltip = new Tooltip();
</script>

<div class="grid">
  <div class="relative mx-auto">
    <span use:choco={tooltip}>HTML*</span>
    <!-- `data-open` toggles the display -->
    <p
      class="invisible absolute top-full left-1/2 -translate-1/2 whitespace-nowrap rounded bg-black px-1 text-xs leading-none data-[open=true]:visible"
      use:choco={tooltip.target}
    >
      Hypertext Markup Language
    </p>
  </div>
</div>

<!-- Just to see what's going on -->
<div class="mt-10 grid">
  <p>Control attributes</p>
  <pre>{JSON.stringify(tooltip.attributes, null, 2)}</pre>
  <p>Target attributes</p>
  <pre>{JSON.stringify(tooltip.target.attributes, null, 2)}</pre>
</div>
