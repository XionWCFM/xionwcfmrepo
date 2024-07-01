import type { MetadataRoute } from "next";
import { getAllPosts } from "../src/entities/post/model/post.service";
import { BASE_SITE_URL } from "../src/shared/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${BASE_SITE_URL}/posts/${post.filePath.join("/")}`,
    lastModified: new Date(post.releaseDate),
  }));

  const MAIN_URL = {
    url: BASE_SITE_URL,
    lastModified: new Date(),
  };

  const allSitesMap = postUrls.concat(MAIN_URL);
  return allSitesMap;
}
