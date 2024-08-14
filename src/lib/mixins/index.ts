import { mergeActions } from "$lib/actions/combineActions.js";
import { ChocoBase } from "$lib/headless/base.svelte.js";
import type { Action } from "svelte/action";
import type { Constructor } from "./types.js";

export const mix = <
  T extends HTMLElement,
  U extends (superclass: Constructor<ChocoBase<T>>) => Constructor<ChocoBase<T>>,
  K extends string,
>(
  superclass: Constructor<ChocoBase<T>>,
  mixin: U,
  key: K,
) => {
  const Mixin = class extends mixin(ChocoBase) {};
  const symbol = Symbol();

  return class extends superclass {
    [symbol]: InstanceType<typeof Mixin>;

    get [key]() {
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
  } as unknown as typeof superclass extends { new (...options: infer Options): infer Instance }
    ? new (...options: Options) => Instance & { [Key in K]: InstanceType<ReturnType<U>> }
    : never;
};
