import { head, styles, texts } from "./meta";
import { type HeadConfig } from "vitepress";

const mainNav = [
  {
    text: "Docs",
    link: "/docs/overview/introduction"
  },
  {
    text: "Components",
    link: "/docs/components/picker-ui"
  }
  // {
  //   text: "Storybook",
  //   link: "/storybook/index.html?path=/docs/pickerui-root--docs",
  //   target: "_blank"
  // }
];

const sideNav = [
  {
    text: "Getting started",
    collapsed: false,
    items: [
      { text: "Introduction", link: "/docs/overview/introduction" },
      { text: "Installation", link: "/docs/overview/installation" }
    ]
  },
  {
    text: "Guides",
    collapsed: false,
    items: [
      { text: "Styling", link: "/docs/guides/styling" },
      { text: "Composition", link: "/docs/guides/composition" }
    ]
  },
  {
    text: "Components",
    collapsed: false,
    items: [
      {
        text: "Picker UI",
        link: "/docs/components/picker-ui"
      },
      {
        text: "Slider UI",
        link: "/docs/components/slider-ui"
      }
    ]
  },
  {
    text: "Utilities",
    collapsed: false,
    items: [{ text: "useFormatColor", link: "/docs/utilities/use-format-color" }]
  }
];

export const metaHead = [
  ["meta", { name: "theme-color", content: "#00C38A" }],
  ["link", { rel: "icon", href: "/logo.png" }],
  ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
  ["meta", { name: "author", content: "Théo Rodriguez" }],
  [
    "meta",
    {
      name: "keywords",
      content: "vue, nuxt, component-library, color, ui, picker, radix-vue, typescript"
    }
  ],
  ["meta", { property: "og:title", content: texts.name }],
  ["meta", { property: "og:description", content: texts.description }],
  ["meta", { property: "og:url", content: head.url }],
  ["meta", { property: "og:image", content: head.image }],
  [
    "link",
    {
      rel: "preload",
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    }
  ],
  ["noscript", {}, `<link rel="stylesheet" crossorigin="anonymous" href="${styles.font}" />`],
  ["link", { rel: "mask-icon", href: "/logo.svg", color: "#ffffff" }],
  ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }]
] satisfies HeadConfig[];

const links = [
  {
    text: "Github",
    link: head.github
  }
];

export default { mainNav, sideNav, metaHead, links };
