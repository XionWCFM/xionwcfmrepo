import { Paragraph, Stack } from "@xionwcfm/xds";
import { CONSTANTS } from "~/shared/constants";

export const Footer = () => {
  const paragraphsList = [CONSTANTS.AUTHOR_COPYRIGHT, CONSTANTS.LORDICON_LICENSE];
  return (
    <Stack className=" px-16 pb-16">
      {paragraphsList.map((text) => (
        <Paragraph leading={"loose"} size={"2"} as={"span"} weight={"thin"} color={"gray-700"} key={text}>
          {text}
        </Paragraph>
      ))}
    </Stack>
  );
};
