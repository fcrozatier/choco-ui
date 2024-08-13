import { mergeActions } from "$lib/actions/combineActions.js";
import { ChocoBase } from "$lib/headless/base.svelte.js";
import type { Action } from "svelte/action";
import type { Constructor } from "./types.js";

export const mix = <
  T extends HTMLElement,
  U extends (superclass: Constructor<ChocoBase<T>>) => Constructor<ChocoBase<T>>,
>(
  superclass: Constructor<ChocoBase<T>>,
  mixin: U,
  key?: string,
) => {
  const Mixin = class extends mixin(ChocoBase) {};
  const prop = key ?? mixin.name;
  const symbol = Symbol();

  return class extends superclass {
    [symbol]: InstanceType<typeof Mixin>;

    get [prop]() {
      return this[symbol];
    }

    override get attributes() {
      return { ...this[symbol].attributes, ...super.attributes };
    }

    override get action(): Action<T> {
      return mergeActions(this[symbol].action, super.action);
    }

    constructor(...options: any[]) {
      super(options);

      this[symbol] = new Mixin();
    }
  };
};
