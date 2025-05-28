import { Flex, Paragraph } from "@xionwcfm/xds";
import { CONSTANTS } from "~/shared/constants";

export const Footer = () => {
  const paragraphsList = [CONSTANTS.AUTHOR_COPYRIGHT, CONSTANTS.LORDICON_LICENSE];
  return (
    <Flex className=" flex-col px-[16px] pb-[16px]">
      {paragraphsList.map((text) => (
        <Paragraph leading={"loose"} size={"2"} as={"span"} weight={"thin"} color={"gray-700"} key={text}>
          {text}
        </Paragraph>
      ))}
    </Flex>
  );
};
