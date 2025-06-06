import { Flex, Paragraph } from "@xionwcfm/xds";
import { AUTHOR_COPYRIGHT, LORDICON_LICENSE } from "~/shared/constants/constants";

export const Footer = () => {
  const paragraphsList = [AUTHOR_COPYRIGHT, LORDICON_LICENSE];
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
