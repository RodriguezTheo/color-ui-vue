// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "../styles/main.css";
// import "../styles/vp-doc.css";
import "../styles/shiki.css";

const regex = /\/(\w+)\.vue/;
const docsModules = import.meta.glob("../../components/docs/*.vue", { eager: true });

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    for (const path in docsModules)
      app.component(path.match(regex)?.[1] ?? "", (docsModules[path] as any)?.default);
  }
} satisfies Theme;
