import type { RemarkPlugin, MarkdownAstroData } from "@astrojs/markdown-remark";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

const EXCERPT_SEPARATOR = "<!--more-->";

export const customPlugin: RemarkPlugin = () => {
  return async (tree, { data }) => {
    const plain = toString(tree);
    const readingTime = getReadingTime(plain);
    const excerpt = plain.includes(EXCERPT_SEPARATOR)
      ? plain.split(EXCERPT_SEPARATOR)[0]
      : "";

    const astroData = data.astro as MarkdownAstroData;

    astroData.frontmatter = {
      ...astroData.frontmatter,
      minutesRead: readingTime.minutes,
      excerpt: excerpt,
    };
  };
};
