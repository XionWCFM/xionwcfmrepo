import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Stack } from "@xionwcfm/ui/stack";
import { CONSTANTS } from "~/shared/constants";

export const Footer = () => {
  const paragraphsList = [`Contact ${CONSTANTS.AUTHOR_EMAIL}`, CONSTANTS.AUTHOR_COPYRIGHT, CONSTANTS.LORDICON_LICENSE];
  return (
    <Stack className=" bg-gray-100" justify={"center"} align={"center"} as={"footer"} py="20" px="12">
      <Stack>
        {paragraphsList.map((text) => (
          <Paragraph leading={"loose"} as={"span"} weight={"thin"} color={"gray-400"} key={text}>
            {text}
          </Paragraph>
        ))}
      </Stack>
    </Stack>
  );
};
