import { defineConfig } from "astro/config";
// import solid from "@astrojs/solid-js";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
// @ts-ignore
import codeTitlePlugin from "remark-code-titles";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { customPlugin } from "./customRemarkPlugin";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [codeTitlePlugin, customPlugin],
    // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["heading-link"],
          },
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  site: "https://godsenal.com",
  integrations: [
    react(),
    // solid(),
    prefetch(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
});
