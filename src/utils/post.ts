import type { CollectionEntry } from "astro:content";

export const getSortedPost = (posts: CollectionEntry<"post">[]) => {
  return [...posts].sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
};
