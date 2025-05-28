import { Link } from "@repo/router";
import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { shuffle } from "es-toolkit";
import { getAllPosts } from "~/entities/post/libs/getAllPosts";

export const PostRecommend = async (props: { currentPostTitle: string }) => {
  const { currentPostTitle } = props;
  const posts = await getAllPosts();

  return (
    <Stack as="section" className="  bg-primary-alpha-200 ring-[1px] ring-primary-300  px-16 py-8 rounded-md">
      <Paragraph as="span" className=" mb-24 text-primary-600" size={"7"} weight={"bold"}>
        이런 글은 어때요?
      </Paragraph>
      <Stack className="overflow-x-scroll gap-y-16">
        {createRecommendPosts(currentPostTitle, posts).map((post) => (
          <Link
            aria-label={post.title}
            href={`/posts/${post.filePath.join("/")}`}
            key={post.title}
            className=" hover:underline hover:underline-offset-4 peer active:scale-[0.998] transition-all duration-200"
          >
            <Flex className=" whitespace-nowrap peer-active:text-primary-700 peer-hover:text-primary-700 text-gray-700 font-regular text-size-5">
              {post.title}
            </Flex>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

const createRecommendPosts = <T extends { title: string }>(currentPostTitle: string, posts: T[]) => {
  return shuffle(posts.filter((item) => item.title !== currentPostTitle)).slice(0, 5);
};
