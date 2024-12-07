import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllPosts, getPost } from "~/entities/post/model/post.service";
import PostDetailPage from "~/page/PostDetailPage";
import { BASE_SITE_URL } from "~/shared/constants";
import { createMetadata } from "~/shared/utils/external/create-meta-data";

type PostProps = {
  params: Promise<{
    slug: string[];
  }>;
};

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

export default async function Post({ params }: PostProps) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  if (!post) {
    return redirect("/");
  }
  return <PostDetailPage post={post} />;
}
