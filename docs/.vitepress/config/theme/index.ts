import { type DefaultTheme } from "vitepress";
import { head } from "../meta";
import docsConfig from "../docs.config";

export default {
  nav: docsConfig.mainNav,
  sidebar: docsConfig.sideNav,
  logo: "/logo.svg",
  socialLinks: [{ icon: "github", link: head.github }]
} as DefaultTheme.Config;
