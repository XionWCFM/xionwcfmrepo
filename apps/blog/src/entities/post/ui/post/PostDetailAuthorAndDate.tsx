import { Image } from "@repo/router";
import { Flex, Paragraph } from "@xionwcfm/xds";
import { format } from "date-fns";
import { ASSET_XION_CIRCLE_LOGO_16_16 } from "~/shared/assets";
import { AUTHOR_NAME } from "~/shared/constants";

type PostDetailAuthorAndDateProps = {
  date: string;
};

export const PostDetailAuthorAndDate = (props: PostDetailAuthorAndDateProps) => {
  const date = format(props.date, "yyyy.MM.dd. HH:mm");

  return (
    <Flex className=" gap-x-[16px] gap-y-[8px] items-end">
      <Flex className=" items-center gap-[4px]">
        <Image className=" translate-y-[2px]" {...ASSET_XION_CIRCLE_LOGO_16_16} width={24} height={24} />
        <Paragraph className=" text-size-5 bg-neutral-600 font-bold">{AUTHOR_NAME}</Paragraph>
      </Flex>
      <Paragraph size={"3"} color={"neutral-600"} weight={"thin"}>
        {date}
      </Paragraph>
    </Flex>
  );
};
