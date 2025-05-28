import { Flex } from "@xionwcfm/xds";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { PostCard } from "~/entities/contents/ui/PostCard";
import { AUTHOR_NICKNAME } from "~/shared/constants/constants";
import { MainTitle } from "~/shared/ui/common/MainTitle";
import { getFormattedDate } from "~/shared/utils/date/getFormattedDate";
import { Footer } from "~/widgets/footer";

export default async function RootPage() {
  const sortedPosts = await contentsRepository.getSortedResources();
  return (
    <>
      <MainTitle />
      <Flex className=" flex-col w-full items-center">
        <Flex className=" flex-col max-w-[768px]">
          <Flex className=" flex-col my-[28px] gap-[16px]">
            {sortedPosts.map((post) => (
              <PostCard key={post.fileName} {...createPostCardViewModel(post)} />
            ))}
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
}

const createPostCardViewModel = (post: Awaited<ReturnType<typeof contentsRepository.getSortedResources>>[number]) => {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.path.replace("/", ""),
    href: `/posts/${post.fileName}`,
    authorNickname: AUTHOR_NICKNAME,
    date: getFormattedDate(post.stats.createdAt, "yyyy년 MM월 dd일", "0000년 00월 00일"),
  };
};
