import type { MetadataRoute } from "next";
import { contentsRepository } from "~/entities/contents/model/contents.repository";
import { BASE_SITE_URL } from "~/shared/constants/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = contentsRepository.getAllFilePaths();
  const result = posts.map((post) => {
    return {
      url: `${BASE_SITE_URL}/posts/${post.fileName}`,
      lastModified: new Date(),
    };
  });
  return [{ url: BASE_SITE_URL, lastModified: new Date() }, ...result];
}
