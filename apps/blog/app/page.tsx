import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Separate } from "@xionwcfm/ui/separate";
import { Stack } from "@xionwcfm/ui/stack";
import { getAllPostsSortedByReleaseDate } from "~/entities/post/model/post.service";
import { PostCard } from "~/entities/post/ui/post/post-card";
import { AUTHOR_NICKNAME } from "~/shared/constants";
import { MainXionWCFM } from "~/shared/ui/common/main-xion-wcfm";
import { Footer } from "~/widgets/footer";
import { StaticHeader } from "~/widgets/header/static-header";
export default async function RootPage() {
  const posts = await getAllPostsSortedByReleaseDate();
  const currentPostTitle = `${AUTHOR_NICKNAME}의 최신 포스트 보기`;
  return (
    <>
      <Stack className=" min-h-screen bg-neutral-50">
        <StaticHeader />
        <Stack w={"100%"} justify={"center"} items={"center"}>
          <Stack w={"screen"} maxW={{ md: "768", xl: "1024" }}>
            <MainXionWCFM />
            <Stack px={{ initial: "16", md: "0" }}>
              <Stack>
                <Paragraph color={"neutral-800"} weight={"light"} size={"7"} responsive mt={"24"} mb={"12"}>
                  {currentPostTitle}
                </Paragraph>
                <Separate />
              </Stack>
              <Stack my={"28"} gap={"16"}>
                {posts.map((post) => (
                  <PostCard key={post.title} post={post} />
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
