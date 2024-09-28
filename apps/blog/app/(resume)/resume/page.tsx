import { Link } from "@xionwcfm/adapters/link";
import { Button, Flex, Paragraph, Pressable, Spacing, Stack } from "@xionwcfm/xds";
import { Fragment, ReactNode } from "react";
import { CONSTANTS } from "~/shared/constants";
import { Iframe } from "~/shared/ui/iframe";

export default function Page() {
  return (
    <Stack px={{ initial: "16" }} pt={{ initial: "20" }}>
      <ResumeTitle />

      <SectionLayout top="Link">
        <Stack gap={"8"}>
          {LINKS.map((link) => (
            <LinkList key={link.href} {...link} />
          ))}
        </Stack>
      </SectionLayout>

      <Stack>
        <Iframe src={CONSTANTS.GRASSHOPPER_SITE_URL} title="grasshopper site" device={"IPHONE_14_PRO_MAX"} />
      </Stack>
    </Stack>
  );
}

const ResumeTitle = () => {
  return (
    <Fragment>
      <Paragraph as="h2" size={"9"} color={"neutral-700"}>
        유길종
      </Paragraph>
      <Paragraph as="h3" size={"7"} color={"neutral-500"} weight={"light"}>
        프론트엔드 개발자
      </Paragraph>
      <Spacing h={"16"} />
    </Fragment>
  );
};

const SectionLayout = ({ children, top }: { children?: ReactNode; top?: ReactNode }) => {
  return (
    <Stack gap={"16"} my={"16"}>
      <Paragraph size={"8"} color={"neutral-800"}>
        {top}
      </Paragraph>
      {children}
    </Stack>
  );
};

const LINKS = [
  { href: CONSTANTS.EXTERNAL_GITHUB, left: "Github", right: CONSTANTS.EXTERNAL_GITHUB, "aria-label": "github url" },
  {
    href: CONSTANTS.EXTERNAL_LINKED_IN,
    left: "LinkedIn",
    right: CONSTANTS.EXTERNAL_LINKED_IN,
    "aria-label": "linkedin url",
  },
  { href: CONSTANTS.TECH_BLOG_URL, left: "Tech Blog", right: CONSTANTS.TECH_BLOG_URL, "aria-label": "tech blog url" },
  { href: CONSTANTS.RESUME_URL, left: "Resume", right: CONSTANTS.RESUME_URL, "aria-label": "resume url" },
];

const LinkList = (props: { href: string; "aria-label": string; left: ReactNode; right: string }) => {
  const { left, right, href } = props;
  return (
    <Flex gap={"8"}>
      <Paragraph size={"5"} color={"neutral-600"}>
        {left}
      </Paragraph>
      <Pressable>
        <Button variant={"link"} className=" text-neutral-600 underline underline-offset-4">
          <Link href={href} aria-label={props["aria-label"]} className=" flex text-left text-pretty">
            {right}
          </Link>
        </Button>
      </Pressable>
    </Flex>
  );
};
