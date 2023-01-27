import type { GetStaticPaths, GetStaticPathsResult } from "astro";

export type UnWrap<T> = T extends Promise<infer U> ? U : T;

export type InferStaticPathResult<
  T extends GetStaticPathsResult | GetStaticPathsResult[]
> = T extends GetStaticPathsResult[] ? T[number][number] : T[number];

export type InferStaticPathsProps<T extends GetStaticPaths> =
  InferStaticPathResult<UnWrap<ReturnType<T>>>["props"];
