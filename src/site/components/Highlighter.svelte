<svelte:options preserveWhitespace={true} />

<script context="module" lang="ts">
  import { type bundledLanguages, type BundledTheme, createHighlighter } from "shiki";

  const theme: BundledTheme = "dark-plus";

  export const highlighter = await createHighlighter({
    themes: [theme],
    langs: ["svelte", "ts", "shell"],
  });
</script>

<script lang="ts">
  let { code, lang = "svelte" }: { code: string; lang: keyof typeof bundledLanguages } = $props();
</script>

{@html highlighter.codeToHtml(code, { lang, theme })}
