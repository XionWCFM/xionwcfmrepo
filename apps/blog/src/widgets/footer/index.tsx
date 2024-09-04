import { Paragraph, Stack } from "@xionwcfm/xds";
import { CONSTANTS } from "~/shared/constants";

export const Footer = () => {
  const paragraphsList = [`Contact ${CONSTANTS.AUTHOR_EMAIL}`, CONSTANTS.AUTHOR_COPYRIGHT, CONSTANTS.LORDICON_LICENSE];
  return (
    <Stack className=" bg-gray-100" justify={"center"} items={"center"} as={"footer"} py="20" px="12">
      <Stack>
        {paragraphsList.map((text) => (
          <Paragraph leading={"loose"} as={"span"} weight={"thin"} color={"gray-700"} key={text}>
            {text}
          </Paragraph>
        ))}
      </Stack>
    </Stack>
  );
};
