import type { MetadataRoute } from "next";
import { cookies } from "next/headers";
import { getAllPosts } from "~/entities/post/api/getAllPosts";
import { BASE_SITE_URL } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cookieStore = await cookies();
  const posts = await getAllPosts(cookieStore);

  const postUrls = posts.map((post) => ({
    url: `${BASE_SITE_URL}${ROUTES.postDetail([post.category, post.slug])}`,
    lastModified: new Date(),
  }));

  const mainUrl = {
    url: BASE_SITE_URL,
    lastModified: new Date(),
  };

  const allSitesMap = postUrls.concat(mainUrl);
  return allSitesMap;
}
