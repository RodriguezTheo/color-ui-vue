import { resolve } from "node:path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    vueJsx(),
    dts({
      tsconfigPath: "tsconfig.build.json",
      cleanVueFileName: true,
      exclude: ["src/test/**", "src/**/stories/**", "src/**/*.stories.ts"]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src")
    },
    dedupe: ["vue", "@vue/runtime-core"]
  },
  build: {
    lib: {
      name: "@color-ui-vue",
      fileName: (format, name) => {
        return `${name}.${format === "es" ? "js" : "umd.cjs"}`;
      },
      entry: {
        index: resolve(__dirname, "src/index.ts")
      }
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library (Vue)
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "index.css";
          return chunkInfo.name as string;
        }
      }
    }
  }
});
