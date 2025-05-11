import type { MetadataRoute } from "next";
import { BASE_SITE_URL } from "~/shared/constants";
import { getPostPaths } from "~/shared/routes/createRoutes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postPaths = getPostPaths();
  const postUrls = postPaths.map((path) => ({
    url: `${BASE_SITE_URL}/posts/${path}`,
    lastModified: new Date(),
  }));

  const mainUrl = {
    url: BASE_SITE_URL,
    lastModified: new Date(),
  };

  const allSitesMap = postUrls.concat(mainUrl);
  return allSitesMap;
}
