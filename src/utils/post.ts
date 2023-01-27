import type { CollectionEntry } from "astro:content";

export const getSortedPost = (posts: CollectionEntry<"post">[]) => {
  return [...posts].sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
};

const getSortedCountList = (key: string[]) => {
  return Object.entries(
    key.reduce(
      (acc, item) => ({
        ...acc,
        [item]: (acc[item] ?? 0) + 1,
      }),
      {} as Record<string, number>
    )
  ).sort((a, b) => b[1] - a[1]);
};

export const getAllTagsWithCount = (posts: CollectionEntry<"post">[]) => {
  return getSortedCountList(posts.map((v) => v.data.tags || []).flat());
};

export const getAllCategoriesWithCount = (posts: CollectionEntry<"post">[]) => {
  return getSortedCountList(posts.map((v) => v.data.categories || []).flat());
};
