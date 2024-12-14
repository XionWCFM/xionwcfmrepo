"use client";
import { Link } from "@repo/router/link";
import { Button, Stack } from "@xionwcfm/xds";

export default function Page() {
  return (
    <Stack h={"screen"} justify={"center"} items={"center"}>
      <Link href={"/api/login/google"} aria-label="Google Login">
        <Button variant={"emphasis"} size={"md"}>
          Google Login
        </Button>
      </Link>
    </Stack>
  );
}
