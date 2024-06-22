import type { Metadata } from "next";
import "./globals.css";
import { AUTHOR_NAME, BASE_SITE_DESCRIPTION, BASE_SITE_TITLE, BASE_SITE_URL } from "../src/shared/constants";
import { createMetadata } from "../src/shared/utils/external/create-meta-data";
import AutoRefresh from "./auto-refresh";

export const metadata: Metadata = createMetadata({
  authors: AUTHOR_NAME,
  description: BASE_SITE_DESCRIPTION,
  title: BASE_SITE_TITLE,
  url: BASE_SITE_URL,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AutoRefresh>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </AutoRefresh>
  );
}
