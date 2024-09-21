import type { ChocoBase } from "$lib/blocks/base.svelte.js";
import type { HTMLElementsMap, HTMLTag } from "$lib/utils/types.js";

export const choco = <T extends HTMLTag>(
  _node: NoInfer<HTMLElementsMap[T]>,
  _param: ChocoBase<T>,
): void => {
  throw new Error("To remove this error add choco preprocessor to your svelte config");
};
