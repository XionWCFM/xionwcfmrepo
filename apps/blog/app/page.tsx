import { Paragraph, Stack } from "@xionwcfm/xds";
import { compareDesc, format, isAfter, parseISO } from "date-fns";
import { getAllPosts } from "~/entities/post/api/getAllPosts";
import { PostCard } from "~/entities/post/ui/post/PostCard";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import { Border } from "~/shared/ui/common/Border";
import { MainTitle } from "~/shared/ui/common/MainTitle";

import { Footer } from "~/widgets/footer";

export default async function RootPage() {
  const rawPosts = await getAllPosts();
  const posts = createCurrentPost(rawPosts);
  const currentPostTitle = `${AUTHOR_NICKNAME}의 최신 포스트 보기`;

  return (
    <>
      <Stack className=" min-h-screen bg-neutral-50 ">
        <Stack w={"100%"} justify={"center"} items={"center"}>
          <Stack w={"screen"} maxW={{ md: "768", xl: "1024" }}>
            <MainTitle />
            <Stack px={{ initial: "16", md: "0" }}>
              <Stack>
                <Paragraph color={"neutral-800"} weight={"light"} size={"7"} responsive={true} mt={"24"} mb={"12"}>
                  {currentPostTitle}
                </Paragraph>
                <Border />
              </Stack>
              <Stack my={"28"} gap={"16"}>
                {posts.map((post) => (
                  <PostCard
                    key={post.title}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    href={ROUTES.postDetail([post.category, post.slug])}
                    authorNickname={AUTHOR_NICKNAME}
                    date={format(parseISO(post.release_date), "yyyy.MM.dd. HH:mm")}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Footer />
    </>
  );
}

const createCurrentPost = <T extends { authority?: string; release_date: string }>(posts: T[]) => {
  return posts
    .filter((post) => post.authority === "viewer" && isAfter(new Date(), parseISO(post.release_date)))
    .sort((a, b) => compareDesc(parseISO(a.release_date), parseISO(b.release_date)));
};
