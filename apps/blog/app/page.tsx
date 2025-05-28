import { Flex } from "@xionwcfm/xds";
import { getAllPosts } from "~/entities/post/libs/getAllPosts";
import { PostCard } from "~/entities/post/ui/post/PostCard";
import { AUTHOR_NICKNAME } from "~/shared/constants/constants";
import { MainTitle } from "~/shared/ui/common/MainTitle";
import { getFormattedDate } from "~/shared/utils/date/getFormattedDate";
import { Footer } from "~/widgets/footer";

export default async function RootPage() {
  const rawPosts = await getAllPosts();

  return (
    <>
      <MainTitle />
      <Flex className=" flex-col w-full items-center">
        <Flex className=" flex-col max-w-[768px]">
          <Flex className=" flex-col my-[28px] gap-[16px]">
            {rawPosts.map((post) => (
              <PostCard key={post.title} {...createPostCardViewModel(post)} />
            ))}
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
}

const createPostCardViewModel = (post: Awaited<ReturnType<typeof getAllPosts>>[number]) => {
  return {
    title: post.title,
    category: post.category,
    description: post.description,
    href: `/posts/${post.filePath.join("/")}`,
    authorNickname: AUTHOR_NICKNAME,
    date: getFormattedDate(post.createdAt, "yyyy년 MM월 dd일", "0000년 00월 00일"),
  };
};
