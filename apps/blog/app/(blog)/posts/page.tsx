import { Suspense } from "@suspensive/react";
import { Flex } from "@xionwcfm/xds";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { PaginationProvider } from "~/features/Pagination/PaginationContext";
import { PostSection } from "~/features/PostSection";

export default async function Page() {
  const posts = await contentsRepository.getSortedResources();

  return (
    <PaginationProvider>
      <Flex className=" flex-col w-full px-[16px] items-center justify-center ">
        <Flex className=" gap-x-[16px] flex-col items-center justify-center w-full mt-[16px] ">
          <Suspense>
            <PostSection posts={posts} />
          </Suspense>
        </Flex>
      </Flex>
    </PaginationProvider>
  );
}
