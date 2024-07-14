"use client";
import { Stack } from "@xionwcfm/ui/stack";
import { useState } from "react";
import { logger } from "~/src/app/providers";
import useNavigationBlocker from "~/src/hooks/use-navigation-blocker";
export default function Home() {
  useNavigationBlocker(async () => {
    return confirm("hel");
  });
  return (
    <Stack>
      hell
      <button
        type="button"
        onClick={() => {
          logger.track("click");
        }}
      >
        click
      </button>
    </Stack>
  );
}
