import type { RemarkPlugin, MarkdownAstroData } from "@astrojs/markdown-remark";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

const EXCERPT_SEPARATOR = "<!--more-->";
const PRUNE_LENGTH = 140;

export const customPlugin: RemarkPlugin = () => {
  return async (tree, { data }) => {
    const plain = toString(tree);
    const readingTime = getReadingTime(plain);
    const splittedText = plain.split(EXCERPT_SEPARATOR)[0] || "";
    const excerpt =
      splittedText.length > PRUNE_LENGTH
        ? `${splittedText.slice(0, PRUNE_LENGTH)}...`
        : splittedText;

    const astroData = data.astro as MarkdownAstroData;

    astroData.frontmatter = {
      ...astroData.frontmatter,
      minutesRead: readingTime.minutes,
      excerpt: excerpt,
    };
  };
};
