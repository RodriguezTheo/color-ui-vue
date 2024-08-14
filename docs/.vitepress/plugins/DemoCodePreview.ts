import type { MarkdownEnv, MarkdownRenderer } from "vitepress";
import type { Token } from "markdown-it";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export const rawPathRegexp =
  /^(.+?(?:\.([a-z0-9]+))?)(#[\w-]+)?(?: ?\{(\d+(?:[,-]\d+)*)? ?(\S+)?\})? ?(?:\[(.+)\])?$/;

function rawPathToToken(rawPath: string) {
  const [filepath = "", extension = "", region = "", lines = "", lang = "", rawTitle = ""] = (
    rawPathRegexp.exec(rawPath) || []
  ).slice(1);

  const title = rawTitle || filepath.split("/").pop() || "";

  return { filepath, extension, region, lines, lang, title };
}

export default function (md: MarkdownRenderer) {
  md.core.ruler.after("inline", "component-preview", (state) => {
    const regex = /<DemoCodePreview value="([^"]+)" \/>/g;

    state.src = state.src.replace(regex, (_, componentName) => {
      const pathName = `../../../components/demo/${componentName}`;

      const { realPath, path: _path } = state.env as MarkdownEnv;

      const childFiles = readdirSync(resolve(dirname(realPath ?? _path), pathName), {
        withFileTypes: false,
        recursive: true
      });
      const groupedFiles = childFiles.reduce(
        (prev, curr) => {
          if (typeof curr !== "string") return prev;
          const parts = curr.split(/[/\\]/);
          if (parts.length > 1) {
            const folder = parts[0];
            const file = parts.slice(1).join("/"); // Re-join the remaining parts to get the full path if nested
            if (!prev[folder]) {
              prev[folder] = [];
            }
            prev[folder].push(file);
          }
          return prev;
        },
        {} as { [key: string]: string[] }
      );

      const index = state.tokens.findIndex((i) => i.content.match(regex));
      state.tokens[index].content = `<DemoCodePreview value="${componentName}">`;

      const tokenArray: Array<Token> = [];

      const createToken = (type: string, tag: string, content: string, info?: string) => {
        const token = new state.Token(type, tag, 0);
        token.content = content;
        if (info) token.info = info;
        tokenArray.push(token);
      };

      Object.entries(groupedFiles).forEach(([key, value]) => {
        value.forEach((file) => {
          if (key === "css") {
            if (file === "style.css") {
              createToken("html_inline", "", `<template #styleCss>`);
            } else {
              createToken("html_inline", "", `<template #indexCss>`);
            }
          } else {
            if (file === "tailwind.config.ts") {
              createToken("html_inline", "", `<template #tailwind>`);
            } else {
              createToken("html_inline", "", `<template #indexVue>`);
            }
          }

          const { filepath, extension, lines, lang, title } = rawPathToToken(
            `${pathName}/${key}/${file}`
          );
          const resolvedPath = resolve(dirname(realPath ?? _path), filepath);
          // Add code tokens for each line
          const token = new state.Token("fence", "code", 0);
          token.info = `${lang || extension}${lines ? `{${lines}}` : ""}${title ? `[${title}]` : ""}`;
          token.content = `<<< ${filepath}`;
          // @ts-expect-error token.src is for snippets plugin to handle importing snippet
          token.src = [resolvedPath];
          tokenArray.push(token);

          createToken("html_inline", "", "</template>");
        });
      });

      createToken("html_inline", "", "</DemoCodePreview>");

      state.tokens.splice(index + 1, 0, ...tokenArray);

      return "";
    });
  });
}
