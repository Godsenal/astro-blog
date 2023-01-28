import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { customPlugin } from "./customRemarkPlugin";

export default defineConfig({
  markdown: {
    remarkPlugins: [customPlugin],
  },
  integrations: [solid(), tailwind({ config: { applyBaseStyles: false } })],
});
