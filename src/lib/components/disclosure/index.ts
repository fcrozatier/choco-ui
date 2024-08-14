import type { DisclosureOptions } from "$lib/headless/disclosure.svelte.js";
import type { StripThunks } from "$lib/utils/binding.js";
import { type Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import Disclosure from "./disclosure.svelte";

export type DisclosureProps = HTMLButtonAttributes &
  StripThunks<DisclosureOptions> & {
    class?: string;
    children: Snippet;
    header: Snippet;
  };

export { Disclosure };
