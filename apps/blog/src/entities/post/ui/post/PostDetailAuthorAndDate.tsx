import { Image } from "@repo/router";
import { Flex, Paragraph } from "@xionwcfm/xds";
import { format } from "date-fns";
import { AUTHOR_NAME } from "~/shared/constants/constants";
import { XION_CIRCLE_LOGO_16_X_16_WEBP } from "~/shared/constants/images/images";

type PostDetailAuthorAndDateProps = {
  date: string;
};

export const PostDetailAuthorAndDate = (props: PostDetailAuthorAndDateProps) => {
  const _date = format(props.date, "yyyy.MM.dd. HH:mm");

  return (
    <Flex className=" gap-x-[16px] gap-y-[8px] items-end">
      <Flex className=" items-center gap-[4px]">
        <Image src={XION_CIRCLE_LOGO_16_X_16_WEBP.src} width={24} height={24} alt="circle logo" />
        <Paragraph className=" translate-y-[0.5px] text-size-5 text-neutral-600 font-bold">{AUTHOR_NAME}</Paragraph>
      </Flex>
    </Flex>
  );
};
