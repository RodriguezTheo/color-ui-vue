import type { MarkdownRenderer } from "vitepress";
import { PACKAGE_MANAGERS_ALLOWED } from "../config/package-manager.config";
import type { Token } from "markdown-it";

export default function (md: MarkdownRenderer) {
  md.core.ruler.after("inline", "component-preview", (state) => {
    const regex = /<InstallationTabs value="([^"]+)" \/>/g;

    state.src = state.src.replace(regex, (_, pkg) => {
      const index = state.tokens.findIndex((i) => i.content.match(regex));
      state.tokens[index].content = `<InstallationTabs value="${pkg}">`;

      const tokenArray: Array<Token> = [];

      const createToken = (type: string, tag: string, content: string, info?: string) => {
        const token = new state.Token(type, tag, 0);
        token.content = content;
        if (info) token.info = info;
        tokenArray.push(token);
      };

      PACKAGE_MANAGERS_ALLOWED.forEach((value) => {
        createToken("html_inline", "", `<template #${value}>`);
        createToken("fence", "code", `$ ${value} add ${pkg}`, `sh [${value}]`);
        createToken("html_inline", "", "</template>");
      });

      createToken("html_inline", "", "</InstallationTabs>");

      state.tokens.splice(index + 1, 0, ...tokenArray);

      return "";
    });
  });
}
