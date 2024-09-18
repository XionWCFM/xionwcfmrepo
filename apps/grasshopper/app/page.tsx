"use client";

import { cn } from "@xionwcfm/xds";
import { Fragment, useState } from "react";
import { HomeTab } from "~/features/landing/home-tab";
import { FixedLandingCta } from "~/features/landing/landing-cta";
import { RankingTab } from "~/features/landing/ranking-tab";
import { Tab } from "~/shared/ui/tab";

const TAB_HOME_VALUE = "home";
const TAB_RANKING_VALUE = "ranking";

export default function Home() {
  const [tab, setTab] = useState(TAB_HOME_VALUE);

  return (
    <Fragment>
      <Tab.Root value={tab} onValueChange={setTab}>
        <Tab.List>
          <Tab.Trigger value={TAB_HOME_VALUE}>홈</Tab.Trigger>
          <Tab.Trigger value={TAB_RANKING_VALUE}>랭킹</Tab.Trigger>
          <Tab.TransrateBar
            className={cn(
              tab === TAB_HOME_VALUE && " translate-x-0",
              tab === TAB_RANKING_VALUE && "translate-x-[100%]",
            )}
          />
        </Tab.List>

        <Tab.Content value={TAB_HOME_VALUE}>
          <HomeTab />
        </Tab.Content>

        <Tab.Content value={TAB_RANKING_VALUE}>
          <RankingTab />
        </Tab.Content>
      </Tab.Root>

      <FixedLandingCta />
    </Fragment>
  );
}
