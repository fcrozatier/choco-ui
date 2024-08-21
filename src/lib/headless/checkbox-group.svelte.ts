import { ChocoBase } from "$lib/base.svelte.js";
import { Group, type GroupOptions } from "$lib/mixins/group.svelte.js";
import { Togglable } from "$lib/mixins/togglable.svelte.js";
import { addListener } from "chocobytes/actions/addListener.js";
import { nanoId } from "chocobytes/utils/index.js";

type CheckboxGroupOptions = GroupOptions & {
  /**
   * The initial state of the root checkbox. Only used to avoid flicker during hydration
   */
  checked?: boolean | "mixed";
};

export type CheckboxOptions = {
  /**
   * Whether the checkbox is initially pressed or not. Defaults to `false`
   */
  checked?: boolean;
  value: string;
};

class Checkbox extends Togglable<"input">(ChocoBase) {
  value;

  constructor(options: CheckboxOptions) {
    super();
    const active = !!options?.checked;
    this.value = options.value;
    this.initTogglable({ active, initial: { checked: active }, toggle: "click" });
    this.extendAttributes({ type: "checkbox", value: options.value });
  }
}

class TriState extends ChocoBase<"input"> {
  checked?: boolean = $state();
  indeterminate?: boolean = $state();

  override get attributes() {
    return {
      ...super.attributes,
      checked: this.checked,
      "aria-checked": this.indeterminate ? ("mixed" as const) : this.checked,
    };
  }

  constructor(initial?: boolean | "mixed") {
    super({ type: "checkbox" });
    this.setState(initial ?? false);
  }

  setState(state: boolean | "mixed") {
    if (typeof state === "boolean") {
      this.checked = state;
      this.indeterminate = false;
    } else if (state === "mixed") {
      this.checked = undefined;
      this.indeterminate = true;
    }
  }
}

export class CheckboxGroup extends Group(Checkbox) {
  #lastActive: string[] = $state([]);

  checked: boolean | "mixed" = $derived(
    this.activeItems.length === this.items.length
      ? true
      : this.activeItems.length === 0
        ? false
        : "mixed",
  );

  root;

  #toggleMixed = () => {
    if (this.checked === "mixed") {
      for (const item of this.items) {
        item.on();
      }
    } else if (this.checked === true) {
      for (const item of this.items) {
        item.off();
      }
    } else {
      for (const item of this.items) {
        this.#lastActive.includes(item.value) ? item.on() : item.off();
      }
    }
  };

  constructor(options?: CheckboxGroupOptions) {
    super(options);

    this.root = new TriState(options?.checked);
    this.root.extendAttributes({ "aria-controls": "" });
    this.root.extendActions(addListener("click", this.#toggleMixed));

    $effect(() => {
      this.root.setState(this.checked);

      if (this.checked === "mixed") {
        this.#lastActive = $state.snapshot(this.group);
      }
    });
  }

  createItem = (options: CheckboxOptions) => {
    const id = nanoId();
    const item = new this.Item(options);

    item.extendAttributes({ id });

    this.root.extendAttributes({
      "aria-controls":
        this.root.attributes["aria-controls"] + (this.items.length === 1 ? "" : " ") + id,
    });

    return item;
  };
}
