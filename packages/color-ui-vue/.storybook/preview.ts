import type { Preview } from "@storybook/vue3";
import "./main.css";
import { darktheme, lightTheme } from "./theme";

const preview: Preview = {
  parameters: {
    darkMode: {
      dark: darktheme,
      light: lightTheme,
      stylePreview: true
    }
  }
};

export default preview;
