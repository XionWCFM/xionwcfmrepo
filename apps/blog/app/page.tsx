import { Link } from "@repo/router";
import { Box, Flex } from "@xionwcfm/xds";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { MainTitle } from "~/shared/ui/common/MainTitle";
import { MainCard } from "../src/entities/contents/ui/MainCard";
import { PostCard } from "../src/entities/contents/ui/PostCard";
import { createPostCardViewModel } from "../src/entities/contents/ui/createPostCardViewModel";

export default async function RootPage() {
  const sortedPosts = await contentsRepository.getSortedResources();
  const mainPost = sortedPosts[0]!;
  const slicedPosts = sortedPosts.slice(0, 4);

  return (
    <>
      <MainTitle />

      <MaxWidthContainer>
        <Flex className=" flex-col mb-[16px]">
          <Flex className=" w-full h-[1px] bg-gray-200 my-[16px]" />
          <span className=" mb-[16px] text-[24px] text-gray-900 font-medium">이런 글은 어떠세요?</span>
          <MainCard {...createPostCardViewModel(mainPost)} />
        </Flex>

        <Flex className=" w-full h-[1px] bg-gray-200 my-[16px]" />

        <Link
          href="/posts"
          aria-label="더 많은 포스트 확인하러가기"
          className=" mb-[16px] text-[24px] text-gray-900 hover:text-primary-600 duration-300 transition-all font-medium w-fit "
        >
          더 많은 포스트를 확인해보세요
        </Link>

        <Flex className=" flex-col gap-y-[16px] mb-[16px]">
          {slicedPosts.map((post) => (
            <PostCard key={post.fileName} {...createPostCardViewModel(post)} />
          ))}
        </Flex>

        <Flex className=" justify-end w-full">
          <Link href="/posts" aria-label="더 많은 포스트 확인하러가기" className=" text-primary-alpha-900 underline ">
            Read More
          </Link>
        </Flex>
      </MaxWidthContainer>

      <Box className=" h-[200px]" />
    </>
  );
}

const MaxWidthContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Flex className=" p-[16px] w-screen justify-center items-center">
      <Flex className=" max-w-[768px] w-full flex-col">{children}</Flex>
    </Flex>
  );
};
