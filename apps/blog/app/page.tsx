import { Stack } from "@xionwcfm/xds";
import { compareDesc, isAfter, parseISO } from "date-fns";
import { getAllPosts } from "~/entities/post/api/getAllPosts";
import { PostCard } from "~/entities/post/ui/post/PostCard";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import FadeContent from "~/shared/ui/animations/FadeContent/FadeContent";
import { Border } from "~/shared/ui/common/Border";
import { MainTitle } from "~/shared/ui/common/MainTitle";
import { getFormattedDate } from "~/shared/utils/date/getFormattedDate";

import { Footer } from "~/widgets/footer";

export default async function RootPage() {
  const rawPosts = await getAllPosts();
  const posts = createCurrentPost(rawPosts);
  const _currentPostTitle = `${AUTHOR_NICKNAME}의 최신 포스트 보기`;

  return (
    <>
      <FadeContent className=" min-h-screen bg-neutral-50 ">
        <Stack w={"100%"} justify={"center"} items={"center"}>
          <Stack w={"screen"} maxW={{ md: "768", xl: "1024" }}>
            <MainTitle />
            <Stack px={{ initial: "16", md: "0" }}>
              <Stack>
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
                    date={getFormattedDate(post.release_date, "yyyy년 MM월 dd일", "0000년 00월 00일")}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </FadeContent>

      <Footer />
    </>
  );
}

const createCurrentPost = <T extends { authority?: string; release_date: string }>(posts: T[]) => {
  return posts
    .filter((post) => post.authority === "viewer" && isAfter(new Date(), parseISO(post.release_date)))
    .sort((a, b) => compareDesc(parseISO(a.release_date), parseISO(b.release_date)));
};
