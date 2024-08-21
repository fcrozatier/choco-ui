import type { Attributes, HTMLElementsMap, HTMLTag } from "$lib/utils/types.js";
import { mergeActions } from "chocobytes/actions/combineActions.js";
import type { Action } from "svelte/action";

export class ChocoBase<T extends HTMLTag = "generic"> {
  // @ts-ignore
  #attributes: Attributes<T> = $state({});
  #actions: Action<T>[] = [];

  element!: HTMLElementsMap[T];

  get attributes(): Attributes<T> {
    return this.#attributes;
  }

  set attributes(v: Attributes<T>) {
    this.#attributes = v;
  }

  get action(): Action<HTMLElementsMap[T]> {
    return mergeActions(...this.#actions);
  }

  constructor(attributes?: NoInfer<Attributes<T>>) {
    if (attributes) {
      this.#attributes = attributes;
    }
    this.extendActions((node) => {
      this.element = node;
    });
  }

  extendActions(...actions: Action<HTMLElementsMap[T]>[]) {
    for (const action of actions) {
      this.#actions.push(action);
    }
  }

  extendAttributes(newAttributes: Attributes<T>) {
    this.#attributes = { ...this.#attributes, ...newAttributes };
  }
}
