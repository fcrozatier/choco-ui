<script module lang="ts">
  import { type BundledTheme, createHighlighter } from "shiki";

  const theme: BundledTheme = "dark-plus";

  export const highlighter = await createHighlighter({
    themes: [theme],
    langs: ["svelte", "ts", "js", "sh"],
  });
</script>

<script lang="ts">
  let { code, lang = "svelte" }: { code: string; lang: "svelte" | "ts" | "js" | "sh" } = $props();
</script>

{@html highlighter.codeToHtml(code, { lang, theme })}
