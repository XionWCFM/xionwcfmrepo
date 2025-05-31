import type { contentsRepository } from "~/entities/contents/model/contents.repository";
import { AUTHOR_NICKNAME } from "~/shared/constants/constants";
import { getFormattedDate } from "~/shared/utils/date/getFormattedDate";

export const createPostCardViewModel = (
  post: Awaited<ReturnType<typeof contentsRepository.getSortedResources>>[number],
) => {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.path.replace("/", "") as "development" | "retrospect" | "books",
    href: `/posts/${post.fileName}`,
    authorNickname: AUTHOR_NICKNAME,
    date: getFormattedDate(post.frontmatter.createdAt, "yyyy년 MM월 dd일", "0000년 00월 00일"),
  };
};
