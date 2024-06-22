import type { Metadata } from "next";
import { AUTHOR_NAME, BASE_SITE_NAME, BASE_SITE_TITLE } from "~/shared/constants";

type CreateMetadataParamsType = {
  title: string;
  description: string;

  url: string;
  authors?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};
/**
 * 주어진 매개변수를 사용하여 메타데이터 객체를 생성합니다.
 *
 * @param {CreateMetadataParamsType} param - 메타데이터 생성에 필요한 매개변수를 담고 있는 객체입니다.
 * @param {string} param.title - 메타데이터의 제목입니다.
 * @param {string} param.description - 메타데이터의 설명입니다.
 * @param {string} param.url - 메타데이터와 관련된 URL입니다.
 * @param {string} [param.authors] - 메타데이터의 저자입니다. 기본값은 상수 `AUTHOR_NAME`을 사용합니다.
 * @param {Object} [param.robots] - 검색 엔진 크롤러의 색인 생성 및 팔로우 여부를 제어합니다.
 * @param {boolean} [param.robots.index=true] - 페이지가 검색 엔진에 의해 색인되어야 하는지 여부입니다.
 * @param {boolean} [param.robots.follow=true] - 페이지의 링크를 검색 엔진이 팔로우해야 하는지 여부입니다.
 *
 * @returns {Promise<Metadata>} 생성된 메타데이터 객체를 포함하는 프로미스입니다.
 */
export const createMetadata = (param: CreateMetadataParamsType): Metadata => {
  const index = typeof param.robots?.index === "boolean" ? param.robots.index : true;
  const follow = typeof param.robots?.follow === "boolean" ? param.robots.follow : true;
  const authors = param.authors ?? AUTHOR_NAME;

  const { title, description, url } = param;

  return {
    title: {
      default: title,
      template: `%s - ${BASE_SITE_TITLE}`,
    },
    description,
    alternates: {
      canonical: url,
    },
    authors: {
      name: authors,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: BASE_SITE_NAME,
    },
    twitter: {
      creator: authors,
      card: "summary",
      site: url,
      title,
      description,
    },
    robots: {
      index,
      follow,
    },
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
};
