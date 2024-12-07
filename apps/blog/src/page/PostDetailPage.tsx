import { MdxRemote } from "@repo/mdx";
import { Box, Spacing, Stack } from "@xionwcfm/xds";
import { Chip } from "@xionwcfm/xds/chip";
import type { PostWithFrontmatterType } from "~/entities/post/model/post.model";
import { PostDetailAuthorAndDate } from "~/entities/post/ui/post/PostDetailAuthorAndDate";
import { PostDetailAuthorWithChar } from "~/entities/post/ui/post/PostDetailAuthorWithChar";
import { PostDetailTitle } from "~/entities/post/ui/post/PostDetailTitle";
import { Separate } from "~/shared/ui/common/Separate";

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
