import { Link } from "@repo/router";
import { Flex, Paragraph } from "@xionwcfm/xds";
import { shuffle } from "es-toolkit";
import { contentsRepository } from "~/entities/contents/model/contents.repository";

export const PostRecommend = async (props: { currentPostTitle: string }) => {
  const { currentPostTitle } = props;
  const posts = await contentsRepository.getAllResources();

  return (
    <Flex
      as="section"
      className=" flex-col  bg-primary-alpha-200 ring-[1px] ring-primary-300  px-[16px] py-[8px] rounded-md"
    >
      <Paragraph as="span" className=" mb-[24px] text-primary-600" size={"7"} weight={"bold"}>
        이런 글은 어때요?
      </Paragraph>
      <Flex className=" flex-col overflow-x-scroll gap-y-[16px]">
        {createRecommendPosts(currentPostTitle, posts).map((post) => (
          <Link
            aria-label={post.frontmatter.title}
            href={`/posts/${post.fileName}`}
            key={post.frontmatter.title}
            className=" hover:underline hover:underline-offset-4 peer active:scale-[0.998] transition-all duration-200"
          >
            <Flex className=" whitespace-nowrap peer-active:text-primary-700 peer-hover:text-primary-700 text-gray-700 font-regular text-size-5">
              {post.frontmatter.title}
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

const createRecommendPosts = <T extends { frontmatter: { title: string } }>(currentPostTitle: string, posts: T[]) => {
  return shuffle(posts.filter((item) => item.frontmatter.title !== currentPostTitle)).slice(0, 5);
};
