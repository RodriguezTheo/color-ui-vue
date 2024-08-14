import { defineConfig, postcssIsolateStyles } from "vitepress";
import { texts } from "./config/meta";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import themeConfig from "./config/theme";
import docConfig from "./config/docs.config";
import { markdownOptions } from "./config/markdown.config";

export default defineConfig({
  title: texts.name,
  description: texts.description,
  head: docConfig.metaHead,
  themeConfig: {
    ...themeConfig,
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3]
    }
  },
  srcDir: "content",
  markdown: markdownOptions,
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/, /base\.css/] }),
          tailwind(),
          autoprefixer()
        ]
      }
    }
  }
});
