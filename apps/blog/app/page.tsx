import { Stack } from "@xionwcfm/ui/stack";
import { getAllPosts } from "~/entities/post/model/post.service";

export default async function RootPage() {
  const posts = await getAllPosts();
  return (
    <Stack>
      {posts.map((post) => (
        <div className="" key={post.title}>
          <div className="">{post.filePath}</div>
        </div>
      ))}
    </Stack>
  );
}
