import type { MetadataRoute } from "next";
import { ROUTES } from "~/shared/routes";
import { getAllPosts } from "../src/entities/post/model/post.service";
import { BASE_SITE_URL } from "../src/shared/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${BASE_SITE_URL}${ROUTES.postDetail(post.filePath)}`,
    lastModified: new Date(),
  }));

  const mainUrl = {
    url: BASE_SITE_URL,
    lastModified: new Date(),
  };

  const allSitesMap = postUrls.concat(mainUrl);
  return allSitesMap;
}
