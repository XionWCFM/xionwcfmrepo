import { MdxRemote } from "@repo/mdx";
import { Box, Spacing, Stack } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllPosts, getPost } from "~/entities/post/model/post.service";
import { PostDetailAuthorAndDate } from "~/entities/post/ui/post/PostDetailAuthorAndDate";
import { PostDetailAuthorWithChar } from "~/entities/post/ui/post/PostDetailAuthorWithChar";
import { PostDetailTitle } from "~/entities/post/ui/post/PostDetailTitle";
import { BASE_SITE_URL } from "~/shared/constants";
import { Border } from "~/shared/ui/common/Border";
import { createMetadata } from "~/shared/utils/external/create-meta-data";

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
    <Stack px={{ initial: "16", md: "0" }}>
      <Box my="16">
        <PostDetailTitle>{post.title}</PostDetailTitle>
      </Box>
      <Stack direction={"row"}>
        <Chip>{post.categories}</Chip>
      </Stack>
      <Box my="16">
        <PostDetailAuthorAndDate date={post.releaseDate} />
      </Box>
      <Border />
      <Spacing h={"16"} />
      <MdxRemote source={post.content} />
      <Box my="40">
        <PostDetailAuthorWithChar />
      </Box>
      <Border />
      <Spacing h={"40"} />
    </Stack>
  );
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const post = await getPost(slug);
  if (!post) {
    throw new Error("Post not found");
  }
  const url = `${BASE_SITE_URL}/posts/${post.filePath.join("/")}`;
  const metaData = createMetadata({ description: post.description, title: post.title, url });
  return metaData;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.filePath,
  }));
}

export const dynamic = "force-static";
