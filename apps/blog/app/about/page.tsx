import { Image, Link } from "@repo/router";
import { Flex, Spacing } from "@xionwcfm/xds";
import { NavigateSection } from "~/features/NavigateSection";
import { XION_BOX_LOGO_48_X_16_WEBP } from "~/shared/constants/images/images";
import { Border } from "~/shared/ui/common/Border";
import { MaxWidthFlex } from "~/shared/ui/common/MaxWidthFlex";

export default function Page() {
  return (
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
        </Flex>
        <Border />
      </Flex>

      <Flex className=" mb-[16px]" />

      <Flex className=" flex flex-col px-[16px] md:px-[0px]">
        <Flex className=" flex-col">
          <span className=" text-[28px] text-neutral-700 font-bold">유길종</span>
          <span className=" text-[16px] text-neutral-600 mb-[16px]">Frontend Developer</span>
          <span className=" text-[16px] text-neutral-600 whitespace-pre-wrap">{"프론트엔드 개발자 유길종입니다."}</span>
          <span className=" text-[16px] text-neutral-600 whitespace-pre-wrap">
            저는 티스토리에도 간간히 글을 작성하고 있어요 만약 티스토리에만 있는 글이 궁금하시다면{" "}
            <Link
              href="https://xionwcfm.tistory.com"
              target="_blank"
              className=" text-primary-600 underline underline-offset-2 font-medium"
              aria-label="티스토리 블로그로 이동하기"
            >
              이 링크
            </Link>
            를 눌러주세요
          </span>
        </Flex>
        <Spacing className=" h-[16px]" />
        <span className=" text-[24px] text-neutral-700 font-bold">경력</span>
        <Flex className=" flex-col mt-16 gap-y-[16px]">
          {workHistories.map((workHistory) => (
            <WorkHistory key={workHistory.company} {...workHistory} />
          ))}
        </Flex>
      </Flex>
    </MaxWidthFlex>
  );
}

const workHistories = [
  {
    company: "비바리퍼블리카 (토스)",
    position: "Frontend Platform Engineer",
    period: "2025.06 ~ 재직중",
    description: "",
  },
  {
    company: "페이히어",
    position: "Frontend Platform Engineer",
    period: "2025.03 - 2025.05",
    description: "",
  },
  {
    company: "쿼카크루",
    position: "Frontend Engineer",
    period: "2023.09 ~ 2025.03",
    description: "",
  },
] satisfies WorkHistoryItem[];

interface WorkHistoryItem {
  company: string;
  position: string;
  period: string;
  description: string;
}

const WorkHistory = (props: WorkHistoryItem) => {
  return (
    <Flex className=" flex-col bg-gray-50 p-[16px] rounded-md">
      <span className=" text-[20px]  text-neutral-900 mb-[-4px]">{props.company}</span>
      <span className=" text-[14px] text-neutral-600 mb-[4px]">{props.position}</span>
      <span className=" text-[12px] text-neutral-600 font-light">{props.period}</span>

      {/* TODO: 나중에 설명 추가 */}
      {/* <Flex className=" flex-col pl-[8px] border-l-[1px] border-gray-200">
        <span className=" text-[14px] text-gray-500">{props.description}</span>
      </Flex> */}
    </Flex>
  );
};
