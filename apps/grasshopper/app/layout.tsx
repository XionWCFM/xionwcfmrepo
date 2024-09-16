import { MobileViewLayout } from "@xionwcfm/xds";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Providers } from "src/apps/providers";
import { UserContextProvider } from "~/entities/user/user.store";
import { createMetadata } from "~/shared/intergration/create-meta-data";

import "@xionwcfm/token/style";
import "@xionwcfm/xds/style";
import "./globals.css";

export const metadata: Metadata = createMetadata({
  title: "나는 메뚜기의 종류를 100가지 이상 알고 있다.",
  description:
    "나는 메뚜기의 종류를 100가지 이상 알고 있다.는 대한민국의 국군 심리검사 및 인성검사 항목의 질문 내용 중 하나입니다.",
  url: "https://www.xionwcfm.com",
});

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
        <MobileViewLayout>
          <Providers>
            <UserContextProvider>{children}</UserContextProvider>
          </Providers>
        </MobileViewLayout>
      </body>
    </html>
  );
}
