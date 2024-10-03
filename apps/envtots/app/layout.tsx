import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Providers } from "src/apps/providers";

import "@xionwcfm/token/style";
import "@xionwcfm/xds/style";
import "./globals.css";

export const metadata: Metadata = {
  title: "environment to ts",
  description: "env to ts",
};

const notoSansKr = Noto_Sans_KR({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
