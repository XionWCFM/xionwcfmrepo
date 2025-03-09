import type { MetadataRoute } from "next";
import { BASE_SITE_URL } from "../src/shared/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_SITE_URL}/sitemap.xml`,
  };
}
