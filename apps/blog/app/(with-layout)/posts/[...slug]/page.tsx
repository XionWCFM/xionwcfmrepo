import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPost } from "~/entities/post/model/post.service";
import PostDetailPage from "~/page/post-detail.page";
import { BASE_SITE_URL } from "~/shared/constants";
import { createMetadata } from "~/shared/utils/external/create-meta-data";

type PostProps = {
  params: {
    slug: string[];
  };
};

export const generateMetadata = async (params: PostProps): Promise<Metadata> => {
  const slug = params.params.slug;
  const post = await getPost(slug);
  if (!post) throw new Error("Post not found");
  const url = `${BASE_SITE_URL}/posts/${post.filePath.join("/")}`;
  const metaData = createMetadata({ description: post.description, title: post.title, url });
  return metaData;
};

export default async function Post(params: PostProps) {
  const slug = params.params.slug;
  const post = await getPost(slug);
  if (!post) return redirect("/");
  return <PostDetailPage post={post} />;
}
