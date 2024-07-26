import type { Plugin } from "vite";
import { expand } from "./transformer.js";

const script = /<script(?!context).*?>(?<script>(.|\r?\n)*?)<\/script>/;
const svelteFile = /\.svelte$/;
const svelteModule = /\.svelte\.ts$/;
const callsBind = /(^|[^.\w])bind\(/;

export const expandSvelteFile = ({ filename, content }: { filename: string; content: string }) => {
  let scriptTag = content.match(script)?.groups?.script;
  if (!scriptTag || !callsBind.test(scriptTag)) return null;

  const code = expand({ filename, content: scriptTag });

  return content.replace(scriptTag, code);
};

export const autoBind = () => {
  return {
    name: "vite-plugin-bind",
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
