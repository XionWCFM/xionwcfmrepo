"use client";
import { useInternalRouter } from "@repo/router/router";
import { $Routes } from "~/shared/routes";

import { Bar } from "~/shared/ui/bar";

export const EnterNameBar = () => {
  const router = useInternalRouter();
  const handleBackClick = () => {
    router.push($Routes.root.path());
  };

  return <Bar.Root left={<Bar.BackIcon onClick={handleBackClick} />} />;
};
