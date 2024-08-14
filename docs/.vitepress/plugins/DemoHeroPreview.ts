import type { MarkdownRenderer } from "vitepress";

export default function (md: MarkdownRenderer) {
  md.core.ruler.after("inline", "component-preview", (state) => {
    const insertComponentImport = (importString: string) => {
      const index = state.tokens.findIndex(
        (i) => i.type === "html_block" && i.content.match(/<script setup>/g)
      );
      if (index === -1) {
        const importComponent = new state.Token("html_block", "", 0);

        importComponent.content = `<script setup>\n${importString}\n</script>\n`;
        state.tokens.splice(0, 0, importComponent);
      } else {
        const content = state.tokens[index].content;
        state.tokens[index].content = content.replace("</script>", `${importString}\n</script>`);
      }
    };

    // Define the regular expression to match the desired pattern
    const regex = /<DemoHeroPreview value="([^"]+)" \/>/g;

    // Iterate through the Markdown content and replace the pattern
    state.src = state.src.replace(regex, (match, componentName) => {
      const pathName = `../../../components/demo/${componentName}`;
      insertComponentImport(`import ${componentName} from '${pathName}/tailwind/index.vue'`);

      const index = state.tokens.findIndex((i) => i.content.match(regex));

      state.tokens[index].content =
        `<DemoHeroPreview value="${componentName}"><${componentName} />`;
      const dummyToken = new state.Token("", "", 0);
      const tokenArray: Array<typeof dummyToken> = [];

      const endTag = new state.Token("html_inline", "", 0);
      endTag.content = "</DemoHeroPreview>";
      tokenArray.push(endTag);

      state.tokens.splice(index + 1, 0, ...tokenArray);

      return "";
    });
  });
}
