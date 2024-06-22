import type { Metadata } from "next";
import "./globals.css";
import AutoRefresh from "./auto-refresh";

export const metadata: Metadata = {
  title: {
    default: "xionwcfm - frontend developer",
    template: "%s - xionwcfm",
  },
  description: "프론트엔드 개발자 유길종의 기술 블로그입니다. XionWCFM, 냠냠맨 등의 이름으로도 활동하였습니다.",
  icons: {
    icon: [
      { rel: "apple-touch-icon", sizes: "57x57", url: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "60x60", url: "/apple-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes: "72x72", url: "/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", url: "/apple-icon-76x76.png" },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        url: "/apple-icon-114x114.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        url: "/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        url: "/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        url: "/apple-icon-152x152.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-icon-180x180.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
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
      </html>
    </AutoRefresh>
  );
}
