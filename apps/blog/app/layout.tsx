import "@xionwcfm/token/style";
import "@xionwcfm/xds/style";
import "./globals.css";

import { Suspense } from "@suspensive/react";
import { Toaster } from "@xionwcfm/xds/toast";
import type { Metadata } from "next";
import { AnalyticsProvider } from "~/shared/packages/analytics";
import { env } from "~/shared/packages/env";
import { AutoRefresh } from "~/shared/packages/hmr";
import { AUTHOR_NAME, BASE_SITE_DESCRIPTION, BASE_SITE_TITLE, BASE_SITE_URL } from "../src/shared/constants/constants";
import { Pretendard } from "../src/shared/constants/fonts";
import { createMetadata } from "../src/shared/utils/external/createMetaData";

export const metadata: Metadata = {
  ...createMetadata({
    authors: AUTHOR_NAME,
    description: BASE_SITE_DESCRIPTION,
    title: BASE_SITE_TITLE,
    url: BASE_SITE_URL,
  }),
  verification: {
    google: env.NEXT_PUBLIC_GSC_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <AnalyticsProvider>
          <Suspense>{children}</Suspense>
          <Toaster visibleToasts={1} />
        </AnalyticsProvider>
        <AutoRefresh />
      </body>
    </html>
  );
}
