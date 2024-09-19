import { addListener } from "$lib/actions/addListener.js";
import { type ChocoBase } from "$lib/base.svelte.js";
import { type Toggler } from "$lib/mixins/togglable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge, modulo } from "$lib/utils/index.js";
import { key } from "$lib/utils/keyboard.js";
import type { Constructor, HTMLTag, Orientation, Required } from "$lib/utils/types.js";
import { SvelteMap } from "svelte/reactivity";

export type GroupOptions = {
  loop?: boolean;
  /**
   * With roving focus, only one item in the list is in the tab sequence at a given moment. Arrows are used to focus another item of the collection
   */
  roving?: boolean;
  /**
   * Prevents having no active elements
   */
  preventInactivation?: boolean;
  /**
   * Whether only a single item can be active at a time.
   */
  exclusive?: boolean;
  /**
   * Whether arrows immediately activate the previous/next item. This mostly makes sense when the group is `exclusive`.
   */
  activateOnNext?: boolean;
  /**
   * The list of active values
   */
  group?: string[] | (() => string[]);
  orientation?: Orientation;
  setGroup?: (v: string[]) => void;
  onFocus?: <T extends HTMLElement>(from: T, to: T) => void;
};

const defaults = {
  group: [],
  loop: false,
  roving: false,
  preventInactivation: false,
  exclusive: false,
  orientation: "horizontal",
} satisfies GroupOptions;

/**
 * Manages focus in a composite widget with the keyboard arrows.
 *
 * The behavior is only added if js is enabled through an action to ensure improving the experience and not degrading it, since roving focus relies on setting `tabindex='-1'` on some elements.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export const Group = <
  U extends HTMLTag,
  T extends Constructor<ChocoBase<U> & Toggler & { value: string }>,
>(
  superclass: T,
) => {
  return class {
    Item: T;
    #itemsMap = new SvelteMap<HTMLElement, InstanceType<T>>();

    options: Required<GroupOptions, "group"> = $state(defaults);
    items: InstanceType<T>[] = $state([]);

    activeItems = $derived(this.items.filter((item) => item.active));
    #group = $derived(getValue(this.options.group));

    get group() {
      return this.#group;
    }

    constructor(options?: GroupOptions) {
      this.options = merge(defaults, options);
      this.Item = this.#Focusable(superclass);

      $effect(() => {
        // Update from options
        for (const item of this.items) {
          getValue(this.options.group).includes(item.value) ? item.on() : item.off();
        }
      });
    }

    #handleKeydown = ((e: KeyboardEvent) => {
      const target = e.currentTarget;
      if (!(target instanceof HTMLElement)) return;

      const index = this.items.findIndex((item) => item === this.#itemsMap.get(target));
      let newIndex = index;

      switch (e.key) {
        // @ts-ignore Fallthrough
        case key.ARROW_UP:
          if (this.options.orientation === "horizontal") {
            return;
          }
        case key.ARROW_LEFT:
          newIndex = this.options.loop
            ? modulo(index - 1, this.items.length)
            : Math.max(0, index - 1);
          break;
        // @ts-ignore Fallthrough
        case key.ARROW_DOWN:
          if (this.options.orientation === "horizontal") {
            return;
          }
        case key.ARROW_RIGHT:
          newIndex = this.options.loop
            ? modulo(index + 1, this.items.length)
            : Math.min(this.items.length - 1, index + 1);
          break;
        case key.HOME:
          newIndex = 0;
          break;
        case key.END:
          newIndex = this.items.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault(); // Avoid firing scroll events

      const oldItem = this.items[index];
      const newItem = this.items[newIndex];
      const from = target;
      const to = this.items.find((item) => item === newItem)?.element;

      if (oldItem && newItem && from && to) {
        // Update tab sequence
        if (this.options.roving) {
          from.tabIndex = -1;
          to.tabIndex = 0;
        }
        to.focus();

        if (this.options.exclusive === true && this.options.activateOnNext === true) {
          newItem.active = true;
        }

        this.options?.onFocus?.(from, to);
      }
    }) as EventListener;

    #Focusable = (superclass: T) => {
      const options = this.options;
      const items = this.items;
      const map = this.#itemsMap;
      const focus = this.#handleKeydown;

      return class extends superclass {
        constructor(...args: any[]) {
          super(...args);

          this.extendActions((node) => {
            if (options.roving) {
              // By default the first item of the list is focusable. If provided, the active item is focusable
              if (map.size === 0 || this.active) {
                node.tabIndex = 0;
                map.forEach((_, element) => {
                  element.tabIndex = -1;
                });
              } else {
                node.tabIndex = -1;
              }
            }

            map.set(node, this as InstanceType<T>);
          });
          this.extendActions(addListener("keydown", focus));

          if (!this.value) throw new Error("All items in a group must have a value");

          if (this.active && !getValue(options.group).includes(this.value)) {
            getValue(options.group).push(this.value);
          }

          items.push(this as InstanceType<T>);
        }

        override toggle() {
          // Prevent toggling off the current active element
          if (
            options?.preventInactivation &&
            this.active &&
            items.every((item) => item === this || !item.active)
          ) {
            return;
          }

          super.toggle();

          if (this.active && options?.exclusive) {
            for (const other of items) {
              if (other.active && other !== this) {
                other.off();
              }
            }
          }

          if (typeof options.group === "function") {
            options.setGroup?.(items.filter((i) => i.active).map((i) => i.value));
          } else {
            options.group = items.filter((i) => i.active).map((i) => i.value);
          }
        }
      };
    };
  };
};
