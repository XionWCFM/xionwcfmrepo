import { Link } from "@repo/router/link";
import { Paragraph, Stack } from "@xionwcfm/xds";
import { AUTHOR_NICKNAME, EXTERNAL_GITHUB } from "~/shared/constants";
import { GithubContributionCalendar } from "~/widgets/GithubContributionCalendar";

export default function Page() {
  return (
    <Stack className=" mt-16">
      <Paragraph weight={"bold"} size={"10"} color={"gray-800"}>
        프론트엔드 개발자 유길종
      </Paragraph>

      <Link
        aria-label="xionwcfm github contribution calendar"
        href={EXTERNAL_GITHUB}
        target="_blank"
        className=" mb-40 rounded-md p-16 active:scale-[0.99] transition-all duration-300 active:bg-gray-50"
      >
        <GithubContributionCalendar username={AUTHOR_NICKNAME} />
      </Link>
    </Stack>
  );
}
