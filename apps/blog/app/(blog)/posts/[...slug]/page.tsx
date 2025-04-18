import { MdxRemote } from "@repo/mdx";
import { Box, Flex, Stack } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import { last } from "es-toolkit";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllPosts } from "~/entities/post/api/getAllPosts";
import { getPostBySlug } from "~/entities/post/api/getPostBySlug";
import { PostDetailAuthorAndDate } from "~/entities/post/ui/post/PostDetailAuthorAndDate";
import { PostDetailAuthorWithChar } from "~/entities/post/ui/post/PostDetailAuthorWithChar";
import { PostDetailTitle } from "~/entities/post/ui/post/PostDetailTitle";
import { BASE_SITE_URL } from "~/shared/constants";
import FadeContent from "~/shared/ui/animations/FadeContent/FadeContent";
import { Border } from "~/shared/ui/common/Border";
import { createMetadata } from "~/shared/utils/external/create-meta-data";
import { PostRecommend } from "~/widgets/PostRecommend";

type PostProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Post({ params }: PostProps) {
  const slug = (await params).slug;
  const lastSlug = last(slug) ?? "";
  const post = await getPostBySlug(lastSlug);

  if (!post) {
    return redirect("/");
  }

  return (
    <FadeContent>
      <Stack as="main" px={{ initial: "16", md: "0" }}>
        <Box my="16">
          <PostDetailTitle>{post.title}</PostDetailTitle>
        </Box>

        <Flex>
          <Chip>{post.category}</Chip>
        </Flex>

        <Box my="16">
          <PostDetailAuthorAndDate date={post.release_date} />
        </Box>

        <Border className=" my-16" />

        <MdxRemote source={post.content} />

        <Border className=" my-16" />

        <PostRecommend currentPostTitle={post.title} />

        <Box my="40">
          <PostDetailAuthorWithChar />
        </Box>

        <Border className=" mb-40" />
      </Stack>
    </FadeContent>
  );
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const lastSlug = last(slug) ?? "";
  const post = await getPostBySlug(lastSlug);
  if (!post) {
    throw new Error("Post not found");
  }

  const url = `${BASE_SITE_URL}/posts/${post.category}/${post.slug}`;
  const metaData = createMetadata({ description: post.description, title: post.title, url });
  return metaData;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: [post.category, post.slug],
  }));
}

export const dynamic = "force-static";
