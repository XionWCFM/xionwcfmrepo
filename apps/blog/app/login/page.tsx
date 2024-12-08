"use client";
import { Link } from "@repo/router/link";
import { Stack } from "@xionwcfm/xds";

export default function Page() {
  return (
    <Stack h={"screen"} justify={"center"} items={"center"}>
      <Link href={"/api/login/google"} aria-label="클릭">
        클릭
      </Link>
    </Stack>
  );
}
