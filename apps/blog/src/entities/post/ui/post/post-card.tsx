import { formatDate } from "@xionwcfm/date/format-date";
import { Box } from "@xionwcfm/ui/box";
import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Stack } from "@xionwcfm/ui/stack";
import Link from "next/link";
import React from "react";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import { getThumbnail } from "../../lib/utils";
import type { PostWithFrontmatterType } from "../../model/post.model";

type PostCardProps = {
  post: PostWithFrontmatterType;
};

export const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const thumbnail = getThumbnail(post.thumbnail ?? "");
  const date = formatDate(post.releaseDate, "yyyy.MM.dd. HH:mm");
  const label = `ReadMore : ${post.title}`;
  return (
    <Stack className="hover:opacity-90 hover:rounded-sm hover:bg-neutral-200 duration-200 transition-colors">
      <Box px="8">
        <Paragraph color={"gray-600"} size={"3"} responsive>
          {post.categories}
        </Paragraph>
      </Box>
      <Link href={ROUTES.postDetail(post.filePath)} aria-label={label}>
        <Stack px="8" pt="4" pb="8">
          <Paragraph
            as="h2"
            size={"6"}
            color={"neutral-700"}
            overflow={"ellipsis"}
            className=" w-full md:max-w-[740px] xl:max-w-[990px] "
            responsive
          >
            {post.title}
          </Paragraph>
          <Paragraph responsive my="12" leading={"loose"} weight={"thin"} size={"4"} color={"neutral-600"}>
            {post.description}
          </Paragraph>
          <Paragraph responsive mt="4" size={"4"} weight={"medium"} color={"neutral-700"}>
            {AUTHOR_NICKNAME}
          </Paragraph>
          <Paragraph responsive as="time" size={"3"} weight={"thin"} color={"neutral-600"}>
            {date}
          </Paragraph>
        </Stack>
      </Link>
    </Stack>
  );
};
