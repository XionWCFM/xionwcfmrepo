import { Link } from "@xionwcfm/adapters/link";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_READING_BOOK } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";

export default function Home() {
  return (
    <PageLayout>
      <Stack items={"center"} justify={"center"}>
        <Stack className=" w-screen max-w-[450px] h-[100vw] max-h-[450px] ">
          <Lottie autoplay loop animationData={LOTTIE_READING_BOOK} />
        </Stack>
        <Spacing h={"24"} />
        <Paragraph color={"neutral-500"} weight={"light"} size={"8"} className=" text-center">
          {"나는 메뚜기의 종류를 \n100가지 이상 맞출 수 있을까?"}
        </Paragraph>
      </Stack>

      <FixedBottom>
        <FixedBottomCta>
          <Link href={$Routes.enterName.path()} aria-label="navigate to username input page">
            시작하기
          </Link>
        </FixedBottomCta>
      </FixedBottom>
    </PageLayout>
  );
}
