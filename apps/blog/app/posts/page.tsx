import { Image, Link } from "@repo/router";
import { Suspense } from "@suspensive/react";
import { Flex } from "@xionwcfm/xds";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { NavigateSection } from "~/features/NavigateSection";
import { PaginationProvider } from "~/features/Pagination/PaginationContext";
import { PostSection } from "~/features/PostSection";
import { XION_BOX_LOGO_48_X_16_WEBP } from "~/shared/constants/images/images";
import { MaxWidthFlex } from "~/shared/ui/common/MaxWidthFlex";

export default async function Page() {
  const posts = await contentsRepository.getAllResources();

  return (
    <PaginationProvider>
      <MaxWidthFlex>
        <Flex className=" h-[16px]" />
        <Flex className=" px-[16px] md:px-[0px]">
          <Link href={"/"} aria-label="home 화면으로 돌아갑니다">
            <Image src={XION_BOX_LOGO_48_X_16_WEBP.src} width={96} height={32} alt="xionwcfm" />
          </Link>
        </Flex>

        <Flex className=" flex-col w-full px-[16px] md:px-[0px] items-center justify-center ">
          <Flex className=" gap-x-[16px] flex-col items-center justify-center w-full mt-[16px] ">
            <Flex className=" w-full  mb-[32px]">
              <NavigateSection />
            </Flex>

            <Suspense>
              <PostSection posts={posts} />
            </Suspense>
          </Flex>
        </Flex>
      </MaxWidthFlex>
    </PaginationProvider>
  );
}

export const dynamic = "force-static";
