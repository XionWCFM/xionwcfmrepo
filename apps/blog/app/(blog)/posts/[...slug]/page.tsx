import { MdxRemote } from "@repo/mdx";
import { Box, Flex, Stack } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPost } from "~/entities/post/libs/getAllPosts";
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
  const post = await getPost(slug);

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
          <PostDetailAuthorAndDate date={post.createdAt} />
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
  const post = await getPost(slug);
  if (!post) {
    throw new Error("Post not found");
  }

  const url = `${BASE_SITE_URL}/posts/${post.filePath}`;
  const metaData = createMetadata({ description: post.description, title: post.title, url });
  return metaData;
};
