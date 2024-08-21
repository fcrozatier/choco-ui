import type { ChocoBase } from "$lib/headless/base.svelte.js";
import type { HTMLElementsMap, HTMLTag } from "$lib/utils/types.js";

export const choco = <T extends HTMLTag>(
  node: NoInfer<HTMLElementsMap[T]>,
  _param: ChocoBase<T>,
) => {
  // Check `node` so ts does not infer a `never` return type
  if (node) {
    throw new Error("To remove this error add choco preprocessor to your svelte config");
  }
};
