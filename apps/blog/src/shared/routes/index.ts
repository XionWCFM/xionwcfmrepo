import { BASE_SITE_URL } from "../constants";

const createBaseUrl = (path: string, context?: RoutesContextType) => {
  const baseurl = context?.withBaseUrl ? BASE_SITE_URL : "";
  return `${baseurl}${path}`;
};
type RoutesContextType = { withBaseUrl?: boolean };

export const ROUTES = {
  root: () => "/",
  postDetail: (postsPath: string[], context?: RoutesContextType) =>
    createBaseUrl(`/posts/${postsPath.join("/")}`, context),
};
