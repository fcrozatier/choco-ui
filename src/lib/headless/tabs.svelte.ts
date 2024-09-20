import { makeFocusable } from "$lib/actions/focus.svelte.js";
import { ChocoBase } from "$lib/base.svelte.js";
import { Group, type GroupOptions } from "$lib/mixins/group.svelte.js";
import { Triggerable } from "$lib/mixins/triggerable.svelte.js";
import { merge, nanoId } from "$lib/utils/index.js";
import { role } from "$lib/utils/roles.js";
import type { OmitSupertype, Required } from "$lib/utils/types.js";

export type TabsOptions = {
  /**
   * The default active tab. If not provided defaults to the first tab
   */
  value?: string;
  /**
   * @default focus: {
   * loop: false,
   * roving: true,
   * exclusive: true,
   * preventInactivation: true,
   * activateOnNext: true,
   * orientation: "horizontal"
   * }
   */
  focus?: OmitSupertype<
    GroupOptions,
    { roving?: boolean; exclusive?: boolean; preventInactivation?: boolean }
  >;
};

const defaults = {
  focus: {
    roving: true,
    exclusive: true,
    preventInactivation: true,
    activateOnNext: true,
    orientation: "horizontal",
  },
} satisfies TabsOptions & { focus: GroupOptions };

export type TabOptions = {
  value: string;
  /**
   * Whether the tab is the default active tab. If not provided the first tab is active
   */
  active?: boolean;
};

class Tab extends Triggerable<"button"> {
  value: string;

  constructor(options: TabOptions) {
    const active = !!options.active;

    super({
      control: { "aria-selected": `${active}` },
      target: {},
      active,
      on: "click",
    });
    const controlId = "tab-" + nanoId();
    const targetId = "panel-" + nanoId();

    this.extendAttributes({
      id: controlId,
      role: role.tab,
      value: options.value,
      "aria-controls": targetId,
    });
    this.target.extendAttributes({
      id: targetId,
      role: role.tabpanel,
      "aria-labelledby": controlId,
    });
    // Make sure the panel is in the tab sequence
    this.target.extendActions(makeFocusable);
    this.value = options.value;
  }
}

/**
 * Tabs
 *
 * If the tab list has a visible label, the element with role tablist has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the `tablist` element has a label provided by `aria-label`.
 *
 * [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export class Tabs extends Group(Tab) {
  #options: Required<TabsOptions, "focus">;
  tablist;

  constructor(options?: TabsOptions) {
    super(merge(defaults.focus, options?.focus));

    this.#options = merge(defaults, options);
    this.tablist = new ChocoBase({
      role: role.tablist,
      "aria-orientation": this.#options.focus.orientation,
      "aria-multiselectable": "false",
    });
  }

  createItem = (options: TabOptions): Tab => {
    // The first tab is active by default
    const active =
      this.#options.value === undefined
        ? this.items.length === 0
        : this.#options.value === options.value;

    return new this.Item({ ...options, active });
  };
}
