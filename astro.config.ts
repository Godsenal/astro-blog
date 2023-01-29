import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import codeTitlePlugin from "rehype-code-titles";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { customPlugin } from "./customRemarkPlugin";

export default defineConfig({
  markdown: {
    remarkPlugins: [customPlugin],
    // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
    rehypePlugins: [
      rehypeHeadingIds,
      codeTitlePlugin,
      () =>
        rehypeAutolinkHeadings({
          properties: {
            className: ["heading-link"],
          },
        }),
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  integrations: [solid(), tailwind({ config: { applyBaseStyles: false } })],
});
