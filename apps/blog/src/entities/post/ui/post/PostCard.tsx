import { Box, Flex, Paragraph, Stack } from "@xionwcfm/xds";
import Link from "next/link";

type PostCardProps = {
  date: string;
  title: string;
  category: string;
  description: string;
  href: string;
  authorNickname: string;
};

export const PostCard = (props: PostCardProps) => {
  const { date, title, category, description, href, authorNickname } = props;
  const label = `ReadMore : ${title}`;

  return (
    <Stack className=" py-16 px-12 transition-all rounded-[14px] duration-300 hover:opacity-80  hover:bg-neutral-200 active:opacity-56 active:scale-[0.99] ">
      <Box className="w-fit ">
        <Paragraph color={"neutral-500"} size={"3"}>
          {category}
        </Paragraph>
      </Box>
      <Link href={href} aria-label={label} title={label}>
        <Stack>
          <Paragraph
            as="h2"
            size={"5"}
            color={"neutral-700"}
            className=" max-w-[336px] md:max-w-[700px]"
            responsive={true}
            overflow={"ellipsis"}
          >
            {title}
          </Paragraph>
          <Paragraph responsive={true} my="4" leading={"loose"} weight={"thin"} size={"2"} color={"neutral-600"}>
            {description}
          </Paragraph>

          <Flex className=" gap-x-4 items-center">
            <Paragraph responsive={true} as="time" size={"1"} weight={"thin"} color={"neutral-600"}>
              {`${date} - ${authorNickname}`}
            </Paragraph>
          </Flex>
        </Stack>
      </Link>
    </Stack>
  );
};
