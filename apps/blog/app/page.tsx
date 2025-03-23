import { Stack } from "@xionwcfm/xds";
import { compareDesc, isAfter, parseISO } from "date-fns";
import { getAllPosts } from "~/entities/post/api/getAllPosts";
import { PostCard } from "~/entities/post/ui/post/PostCard";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import { MainTitle } from "~/shared/ui/common/MainTitle";
import { getFormattedDate } from "~/shared/utils/date/getFormattedDate";
import { Footer } from "~/widgets/footer";

export default async function RootPage() {
  const rawPosts = await getAllPosts();
  const posts = createCurrentPost(rawPosts);

  return (
    <>
      <MainTitle />
      <Stack className=" w-full items-center">
        <Stack className=" max-w-[768px]">
          <Stack my={"28"} gap={"16"}>
            {posts.map((post) => (
              <PostCard key={post.title} {...createPostCardViewModel(post)} />
            ))}
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}

const createPostCardViewModel = (post: Awaited<ReturnType<typeof getAllPosts>>[number]) => {
  return {
    title: post.title,
    category: post.category,
    description: post.description,
    href: ROUTES.postDetail([post.category, post.slug]),
    authorNickname: AUTHOR_NICKNAME,
    date: getFormattedDate(post.release_date, "yyyy년 MM월 dd일", "0000년 00월 00일"),
  };
};

const createCurrentPost = <T extends { authority?: string; release_date: string }>(posts: T[]) => {
  return posts
    .filter((post) => post.authority === "viewer" && isAfter(new Date(), parseISO(post.release_date)))
    .sort((a, b) => compareDesc(parseISO(a.release_date), parseISO(b.release_date)));
};
