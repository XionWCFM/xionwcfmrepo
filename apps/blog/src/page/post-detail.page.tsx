import { Box } from "@xionwcfm/ui/box";
import { Chip } from "@xionwcfm/ui/chip";
import { Separate } from "@xionwcfm/ui/separate";
import { Spacing } from "@xionwcfm/ui/spacing";
import { Stack } from "@xionwcfm/ui/stack";
import type { PostWithFrontmatterType } from "~/entities/post/model/post.model";
import { MdxRemote } from "~/entities/post/ui/mdx/mdx-remote";
import { PostDetailAuthorAndDate } from "~/entities/post/ui/post/post-detail-author-and-date";
import { PostDetailAuthorWithChar } from "~/entities/post/ui/post/post-detail-author-with-char";
import { PostDetailTitle } from "~/entities/post/ui/post/post-detail-title";
type PostPageProps = {
  post: PostWithFrontmatterType;
};

export default function PostDetailPage({ post }: PostPageProps) {
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
      <Separate />
      <Spacing h={"16"} />
      <MdxRemote source={post.content} />
      <Box my="40">
        <PostDetailAuthorWithChar />
      </Box>
      <Separate />
      <Spacing h={"40"} />
    </Stack>
  );
}
