import { Image } from "@xionwcfm/adapters/image";
import { formatDate } from "@xionwcfm/date/format-date";
import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_CIRCLE_LOGO_16_16 } from "~/shared/assets";
import { AUTHOR_NAME } from "~/shared/constants";

type PostDetailAuthorAndDateProps = {
  date: string;
};

export const PostDetailAuthorAndDate = (props: PostDetailAuthorAndDateProps) => {
  const date = formatDate(props.date, "yyyy.MM.dd - hh:mm");
  return (
    <Stack className="gap-x-16 gap-y-8 items-end">
      <Stack direction={"row"} gap={"4"} align={"center"}>
        <Image className=" translate-y-2" {...ASSET_XION_CIRCLE_LOGO_16_16} width={24} height={24} />
        <Paragraph size={"5"} color={"neutral-600"} weight={"bold"}>
          {AUTHOR_NAME}
        </Paragraph>
      </Stack>
      <Paragraph size={"3"} color={"neutral-500"} weight={"thin"}>
        {date}
      </Paragraph>
    </Stack>
  );
};
