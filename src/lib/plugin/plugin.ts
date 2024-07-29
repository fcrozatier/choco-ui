import type { Plugin } from "vite";
import { expand } from "./transformer.js";

const script = /<script(?!context).*?>(?<script>(.|\r?\n)*?)<\/script>/;
const svelteFile = /\.svelte$/;
const svelteModule = /\.svelte\.ts$/;
const callsBind = /(^|[^.\w])bind\(/;

export const expandSvelteFile = ({ filename, content }: { filename: string; content: string }) => {
  let scriptContent = content.match(script)?.groups?.script;
  if (!scriptContent || !callsBind.test(scriptContent)) return null;

  const code = expand({ filename, content: scriptContent });

  return content.replace(scriptContent, code);
};

export const chocoBind = () => {
  return {
    name: "vite-plugin-choco-bind",
    enforce: "pre",
    transform(content, id) {
      if (svelteModule.test(id)) {
        if (!callsBind.test(content)) return null;
        const code = expand({ filename: id, content });
        return { code };
      }

      if (svelteFile.test(id)) {
        if (!content.match(script)?.groups?.script?.match(callsBind)) return null;
        const code = expandSvelteFile({ filename: id, content });
        if (code) return { code };
      }
    },
  } satisfies Plugin;
};
