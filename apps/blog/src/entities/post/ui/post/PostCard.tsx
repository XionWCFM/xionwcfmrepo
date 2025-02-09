import { Box, Paragraph, Stack } from "@xionwcfm/xds";
import Link from "next/link";
import FadeContent from "~/shared/ui/animations/FadeContent/FadeContent";

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
    <FadeContent duration={1000} easing="ease-out" initialOpacity={0}>
      <Stack className=" py-16 px-12 transition-all rounded-[14px] duration-300 hover:opacity-80  hover:bg-neutral-200 active:opacity-56 active:scale-[0.99] ">
        <Box className="w-fit ">
          <Paragraph color={"neutral-700"}>{category}</Paragraph>
        </Box>
        <Link href={href} aria-label={label} title={label}>
          <Stack>
            <Paragraph
              as="h2"
              size={"6"}
              color={"neutral-700"}
              className=" max-w-[336px]  md:max-w-[700px] xl:max-w-[1000px]"
              responsive={true}
              overflow={"ellipsis"}
            >
              {title}
            </Paragraph>
            <Paragraph responsive={true} my="12" leading={"loose"} weight={"thin"} size={"4"} color={"neutral-600"}>
              {description}
            </Paragraph>
            <Paragraph responsive={true} mt="4" size={"4"} weight={"medium"} color={"neutral-700"}>
              {authorNickname}
            </Paragraph>
            <Paragraph responsive={true} as="time" size={"3"} weight={"thin"} color={"neutral-600"}>
              {date}
            </Paragraph>
          </Stack>
        </Link>
      </Stack>
    </FadeContent>
  );
};
