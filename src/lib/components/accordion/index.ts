import type { Accordion, AccordionOptions } from "$lib/headless/accordion.svelte.js";
import type { OmitSupertype } from "$lib/mixins/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import Root from "./accordion.svelte";
import Item from "./item.svelte";

export type AccordionProps = OmitSupertype<
  AccordionOptions,
  { focus?: { active?: string[] | (() => string[]); setActive?: (v: string[]) => void } }
> & {
  active?: string[];
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
