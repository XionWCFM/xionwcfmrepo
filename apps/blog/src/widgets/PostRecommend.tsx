import { Link } from "@repo/router/link";
import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { shuffle } from "es-toolkit";
import { getAllPosts } from "~/entities/post/model/post.service";
import { ROUTES } from "~/shared/routes";

export const PostRecommend = async () => {
  const posts = await getAllPosts();
  return (
    <Stack as="section" className="  bg-primary-alpha-200 ring-[1px] ring-primary-300  px-16 py-8 rounded-md">
      <Paragraph as="span" className=" mb-24 text-primary-600" size={"7"} weight={"bold"}>
        이런 글은 어때요?
      </Paragraph>
      <Stack className="overflow-x-scroll gap-y-16">
        {shuffle(posts)
          .slice(0, 5)
          .map((post) => (
            <Link
              aria-label={post.title}
              href={ROUTES.postDetail(post.filePath)}
              key={post.title}
              className="  peer active:scale-[0.998] transition-all duration-200"
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
