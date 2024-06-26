import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ClarityScript } from "~/app/script/clarity.script";
import { VercelScript } from "~/app/script/vercel.script";
import { ENVIRONMENT } from "~/shared/environment";
import { AUTHOR_NAME, BASE_SITE_DESCRIPTION, BASE_SITE_TITLE, BASE_SITE_URL } from "../src/shared/constants";
import { createMetadata } from "../src/shared/utils/external/create-meta-data";
import AutoRefresh from "./auto-refresh";

const notoSansKr = Noto_Sans_KR({
  weight: ["200", "300", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata({
    authors: AUTHOR_NAME,
    description: BASE_SITE_DESCRIPTION,
    title: BASE_SITE_TITLE,
    url: BASE_SITE_URL,
  }),
  verification: {
    google: ENVIRONMENT.GSC_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AutoRefresh>
      <html lang="ko" className={notoSansKr.className}>
        <body>{children}</body>
        <ClarityScript />
        <VercelScript />
        <GoogleTagManager gtmId={"GTM-52Z3Z37J"} />
        <GoogleAnalytics gaId={"G-59H4F1GZ8B"} />
      </html>
    </AutoRefresh>
  );
}
