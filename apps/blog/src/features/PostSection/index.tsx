"use client";

import { Image } from "@repo/router";
import { Flex } from "@xionwcfm/xds";
import * as Tabs from "@xionwcfm/xds/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import type { ContentRepositoryItem } from "~/entities/contents/model/contents.schema";
import { PostCard } from "~/entities/contents/ui/PostCard";
import { createPostCardViewModel } from "~/entities/contents/ui/createPostCardViewModel";
import { XION_CHAR_GRAY_60_X_90_WEBP } from "~/shared/constants/images/images";

const CATEGORY_FILTERS = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: "development",
    label: "개발",
  },
  {
    value: "books",
    label: "서평",
  },
  {
    value: "retrospect",
    label: "회고",
  },
] as const;

const categoryFilterSchema = z.enum(["all", "development", "books", "retrospect"] as const);

const CATEGORY_FILTER_SEARCH_PARAMS_KEY = "f";

const usePostCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = useMemo(() => {
    return (
      categoryFilterSchema.safeParse(searchParams.get(CATEGORY_FILTER_SEARCH_PARAMS_KEY) ?? CATEGORY_FILTERS[0]!.value)
        .data ?? CATEGORY_FILTERS[0]!.value
    );
  }, [searchParams]);

  const onCategoryChange = useCallback(
    (value: (typeof CATEGORY_FILTERS)[number]["value"] | (string & {})) => {
      if (categoryFilterSchema.safeParse(value).success) {
        const params = new URLSearchParams(searchParams);
        params.set(CATEGORY_FILTER_SEARCH_PARAMS_KEY, value);
        router.push(`?${params.toString()}`);
      }
    },
    [router, searchParams],
  );

  return useMemo(() => {
    return {
      category,
      onCategoryChange,
    };
  }, [category, onCategoryChange]);
};

const filteredByCategory = (posts: ContentRepositoryItem[], category: (typeof CATEGORY_FILTERS)[number]["value"]) => {
  if (category === "all") {
    return posts;
  }
  return posts.filter((post) => post.path.includes(category));
};

export const PostSection = (props: {
  posts: ContentRepositoryItem[];
}) => {
  const { posts } = props;
  const { category, onCategoryChange } = usePostCategory();

  const memoizedPosts = useMemo(() => filteredByCategory(posts, category), [category, posts]);
  const _allLength = useMemo(() => memoizedPosts.length, [memoizedPosts]);
  const currentCategoryLength = useMemo(() => memoizedPosts.length, [memoizedPosts]);

  return (
    <>
      <Flex className=" w-full flex-col min-h-screen">
        <Tabs.Root value={category} onValueChange={(val) => onCategoryChange(val)}>
          <Tabs.List>
            {CATEGORY_FILTERS.map((filter) => (
              <Tabs.Trigger key={filter.value} value={filter.value}>
                {filter.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        {(() => {
          if (currentCategoryLength === 0) {
            return (
              <Flex className=" flex-col justify-center items-center mt-[32px]">
                <Image
                  src={XION_CHAR_GRAY_60_X_90_WEBP.src}
                  width={150}
                  height={150 * XION_CHAR_GRAY_60_X_90_WEBP.ratio}
                  alt="emtpy case image"
                />
                <span className=" mt-[16px] text-[16px] text-gray-500">아직 포스트가 준비되지 않았어요</span>
              </Flex>
            );
          }

          return (
            <Flex className=" flex-col gap-y-[16px]">
              {memoizedPosts.map((post) => (
                <PostCard key={post.fullPath} {...createPostCardViewModel(post)} />
              ))}
            </Flex>
          );
        })()}
      </Flex>
      <Flex className=" h-[100px]" />
    </>
  );
};
