<svelte:options preserveWhitespace={true} />

<script context="module" lang="ts">
  import { type bundledLanguages, createHighlighter } from "shiki";

  export const highlighter = await createHighlighter({
    themes: ["aurora-x"],
    langs: ["svelte", "ts", "shell"],
  });
</script>

<script lang="ts">
  let { code, lang = "svelte" }: { code: string; lang: keyof typeof bundledLanguages } = $props();
</script>

{@html highlighter.codeToHtml(code, { lang, theme: "aurora-x" })}
