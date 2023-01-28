import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import codeTitlePlugin from "rehype-code-titles";
import { customPlugin } from "./customRemarkPlugin";

export default defineConfig({
  markdown: {
    remarkPlugins: [codeTitlePlugin, customPlugin],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  integrations: [solid(), tailwind({ config: { applyBaseStyles: false } })],
});
