"use client";
import type { ComponentPropsWithoutRef } from "react";
import GithubCalendar from "react-github-calendar";

export const GithubContributionCalendar = (props: ComponentPropsWithoutRef<"div"> & { username: string }) => {
  const { username, ...rest } = props;
  return (
    <div {...rest}>
      <GithubCalendar username={username} />
    </div>
  );
};
