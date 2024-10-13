"use client";
import { Button, Stack } from "@xionwcfm/xds";
import { useRouter } from "next/navigation";
import { logger } from "src/apps/logger";

export default function Home() {
  const router = useRouter();

  return (
    <Stack py={"24"} px={"16"}>
      <Button
        onClick={() => {
          logger.click({ eventName: "click" });
          router.push(`/?hi=${Math.random()}&hello=${Math.random()}`);
        }}
      >
        on
      </Button>
      <div className=" min-h-screen"></div>
      <logger.Screen eventName="asd">
        <Button>heli</Button>
      </logger.Screen>
    </Stack>
  );
}
