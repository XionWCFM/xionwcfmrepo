import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ENVIRONMENT } from "~/shared/environment";
import { AUTHOR_NAME, BASE_SITE_DESCRIPTION, BASE_SITE_TITLE, BASE_SITE_URL } from "../src/shared/constants";
import { createMetadata } from "../src/shared/utils/external/create-meta-data";
import AutoRefresh from "./auto-refresh";

const ClarityScript = dynamic(() => import("~/app/script/clarity.script").then((c) => c.ClarityScript));

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
      <html lang="ko">
        <body>{children}</body>
        <ClarityScript />
      </html>
    </AutoRefresh>
  );
}
