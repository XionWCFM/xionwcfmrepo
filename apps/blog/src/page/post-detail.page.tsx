import type { PostWithFrontmatterType } from "~/entities/post/model/post.model";
import { MdxRemote } from "~/entities/post/ui/mdx/mdx-remote";

type PostPageProps = {
  post: PostWithFrontmatterType;
};

export default function PostDetailPage({ post }: PostPageProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <MdxRemote source={post.content} />
    </article>
  );
}
