import type { MarkdownOptions } from "vitepress";
import InstallationTabsPlugin from "../plugins/InstallationTabs";
import DemoCodePreviewPlugin from "../plugins/DemoCodePreview";
import DemoHeroPreviewPlugin from "../plugins/DemoHeroPreview";

export const markdownOptions: MarkdownOptions = {
  theme: "one-dark-pro",
  preConfig: (md) => {
    md.use(InstallationTabsPlugin);
    md.use(DemoCodePreviewPlugin);
    md.use(DemoHeroPreviewPlugin);
  }
};
