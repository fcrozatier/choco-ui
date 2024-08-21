import type { DisclosureOptions } from "$lib/headless/disclosure.svelte.js";
import type { StripThunks } from "$lib/utils/binding.js";
import type { Attributes } from "$lib/utils/types.js";
import { type Snippet } from "svelte";
import Disclosure from "./disclosure.svelte";

export type DisclosureProps = StripThunks<DisclosureOptions> & {
  class?: string;
  element?: Omit<Attributes<"button">, "class">;
  children: Snippet;
  header: Snippet;
};

export { Disclosure };
