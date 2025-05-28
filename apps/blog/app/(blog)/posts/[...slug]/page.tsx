import { Box, Flex } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPost } from "~/entities/post/libs/getAllPosts";
import { PostDetailAuthorAndDate } from "~/entities/post/ui/post/PostDetailAuthorAndDate";
import { PostDetailAuthorWithChar } from "~/entities/post/ui/post/PostDetailAuthorWithChar";
import { PostDetailTitle } from "~/entities/post/ui/post/PostDetailTitle";
import { BASE_SITE_URL } from "~/shared/constants";
import { MdxRemote } from "~/shared/packages/mdx/MdxRemote";
import { getPostPaths } from "~/shared/routes/createRoutes";
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
      <Flex className=" flex-col px-[16px] md:px-[0px]" as="main">
        <Box className=" my-[16px]">
          <PostDetailTitle>{post.title}</PostDetailTitle>
        </Box>

        <Flex>
          <Chip>{post.category}</Chip>
        </Flex>

        <Box className=" my-[16px]">
          <PostDetailAuthorAndDate date={post.createdAt} />
        </Box>

        <Border className=" my-[16px]" />

        <MdxRemote mdx={post.content} />

        <Border className=" my-[16px]" />

        <PostRecommend currentPostTitle={post.title} />

        <Box className=" my-[40px]">
          <PostDetailAuthorWithChar />
        </Box>

        <Border className=" mb-[40px]" />
      </Flex>
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

export const generateStaticParams = async () => {
  const posts = getPostPaths();
  return posts.map((post) => ({
    slug: post.replace("/posts/", "").split("/"),
  }));
};

export const dynamic = "force-static";
