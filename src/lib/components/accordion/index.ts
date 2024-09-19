import type { OmitSupertype } from "$lib/utils/types.js";
import type { Accordion, AccordionOptions } from "chocobytes/headless/accordion.svelte.js";
import { getContext, setContext, type Snippet } from "svelte";
import Root from "./accordion.svelte";
import Item from "./item.svelte";

export type AccordionProps = OmitSupertype<
  AccordionOptions,
  { focus?: { group?: string[] | (() => string[]); setGroup?: (v: string[]) => void } }
> & {
  group?: string[];
  class?: string;
  children: Snippet;
};

const key = Symbol();

export function set(accordion: Accordion) {
  setContext(key, accordion);
}

export function get() {
  return getContext<Accordion>(key);
}

export { Item, Root };
