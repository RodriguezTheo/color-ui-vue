import { create } from "@storybook/theming/create";

export const lightTheme = create({
  base: "light",
  brandTitle: "Color UI Storybook",
  brandImage: "/logo-st-lgt.png",
  brandTarget: "_self",
  brandUrl: "/docs/overview/introduction.html",

  colorPrimary: "hsl(23, 83%, 58%)",
  colorSecondary: "hsl(23, 83%, 58%)",

  barSelectedColor: "hsl(23, 83%, 58%)",
  buttonBg: "hsl(23, 83%, 58%)",
  barHoverColor: "hsl(23, 83%, 58%)",

  // UI
  appBg: "hsl(0, 0%, 100%)",
  appContentBg: "hsl(0, 0%, 100%)",
  appPreviewBg: "hsl(0, 0%, 100%)"
});

export const darktheme = create({
  base: "dark",
  brandTitle: "Color UI Storybook",
  brandImage: "/logo-st-bk.png",
  brandUrl: "/docs/overview/introduction.html",
  brandTarget: "_self",

  colorPrimary: "hsl(20, 100%, 71%)",
  colorSecondary: "hsl(20, 100%, 71%)",

  barSelectedColor: "hsl(20, 100%, 71%)",
  buttonBg: "hsl(20, 100%, 71%)",
  barHoverColor: "hsl(20, 100%, 71%)",

  barTextColor: "hsl(0, 0%, 100%)",
  textMutedColor: "hsl(0, 0%, 100%)",

  // UI
  appBg: "hsl(240, 10%, 3.9%)",
  appContentBg: "hsl(240, 10%, 3.9%)",
  appPreviewBg: "hsl(240, 10%, 3.9%)",
  barBg: "hsl(240, 10%, 3.9%)"
});
