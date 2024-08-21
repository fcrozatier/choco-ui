import type { DisclosureOptions } from "$lib/headless/disclosure.svelte.js";
import type { StripThunks } from "chocobytes/utils/binding.js";
import type { Attributes } from "chocobytes/utils/types.js";
import { type Snippet } from "svelte";
import Disclosure from "./disclosure.svelte";

export type DisclosureProps = StripThunks<DisclosureOptions> & {
  class?: string;
  element?: Omit<Attributes<"button">, "class">;
  children: Snippet;
  header: Snippet;
};

export { Disclosure };
