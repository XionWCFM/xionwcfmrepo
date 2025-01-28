import { formatDate } from "@repo/date/format-date";

import { Box, Paragraph, Stack } from "@xionwcfm/xds";
import Link from "next/link";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import type { PostWithFrontmatterType } from "../../model/post.model";

type PostCardProps = {
  post: PostWithFrontmatterType;
};

export const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const date = formatDate(post.releaseDate, "yyyy.MM.dd. HH:mm");
  const label = `ReadMore : ${post.title}`;
  return (
    <Stack className=" py-16 px-12 transition-all rounded-[14px] duration-300 hover:opacity-80  hover:bg-neutral-200 active:opacity-56 active:scale-[0.99] ">
      <Box>
        <Paragraph color={"gray-600"} size={"3"} responsive={true}>
          {post.categories}
        </Paragraph>
      </Box>
      <Link href={ROUTES.postDetail(post.filePath)} aria-label={label} title={label}>
        <Stack>
          <Paragraph
            as="h2"
            size={"6"}
            color={"neutral-700"}
            className=" max-w-[336px]  md:max-w-[700px] xl:max-w-[1000px]"
            responsive={true}
            overflow={"ellipsis"}
          >
            {post.title}
          </Paragraph>
          <Paragraph responsive={true} my="12" leading={"loose"} weight={"thin"} size={"4"} color={"neutral-600"}>
            {post.description}
          </Paragraph>
          <Paragraph responsive={true} mt="4" size={"4"} weight={"medium"} color={"neutral-700"}>
            {AUTHOR_NICKNAME}
          </Paragraph>
          <Paragraph responsive={true} as="time" size={"3"} weight={"thin"} color={"neutral-600"}>
            {date}
          </Paragraph>
        </Stack>
      </Link>
    </Stack>
  );
};
