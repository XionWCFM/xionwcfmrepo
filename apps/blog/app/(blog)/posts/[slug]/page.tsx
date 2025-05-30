import { Box, Flex } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { PostDetailAuthorAndDate } from "~/entities/contents/ui/PostDetailAuthorAndDate";
import { PostDetailAuthorWithChar } from "~/entities/contents/ui/PostDetailAuthorWithChar";
import { PostDetailTitle } from "~/entities/contents/ui/PostDetailTitle";
import { BASE_SITE_URL } from "~/shared/constants/constants";
import { MdxRemote } from "~/shared/packages/mdx/MdxRemote";
import { Border } from "~/shared/ui/common/Border";
import { createMetadata } from "~/shared/utils/external/createMetaData";
import { PostRecommend } from "~/widgets/PostRecommend";

type PostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post({ params }: PostProps) {
  const slug = (await params).slug;
  const post = await contentsRepository.compileMdxByFileName(slug);

  if (!post) {
    return redirect("/");
  }

  return (
    <Flex className=" flex-col px-[16px] md:px-[0px]" as="main">
      <Box className=" my-[16px]">
        <PostDetailTitle>{post.frontmatter.title}</PostDetailTitle>
      </Box>

      <Flex>
        <Chip>{post.path.replace("/", "")}</Chip>
      </Flex>

      <Box className=" my-[16px]">
        <PostDetailAuthorAndDate />
      </Box>

      <Border className=" my-[16px]" />

      <MdxRemote mdx={post.code} />

      <Border className=" my-[16px]" />

      <PostRecommend currentPostTitle={post.frontmatter.title} />

      <Box className=" my-[40px]">
        <PostDetailAuthorWithChar />
      </Box>

      <Flex className=" h-[100px] w-full" />
    </Flex>
  );
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const post = await contentsRepository.compileMdxByFileName(slug);

  if (!post) {
    throw new Error("Post not found");
  }

  const url = `${BASE_SITE_URL}/posts/${slug}`;
  const metaData = createMetadata({ description: post.frontmatter.description, title: post.frontmatter.title, url });
  return metaData;
};

export const generateStaticParams = async () => {
  const posts = contentsRepository.getAllFilePaths();
  return posts.map((post) => ({
    slug: post.fileName,
  }));
};

export const dynamic = "force-static";
