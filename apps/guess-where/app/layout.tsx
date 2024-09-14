import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "@xionwcfm/token/style";
import "@xionwcfm/xds/style";
import "./globals.css";
import { Providers } from "src/apps/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const notoSansKr = Noto_Sans_KR({
  weight: ["200", "300", "500", "700"],
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
