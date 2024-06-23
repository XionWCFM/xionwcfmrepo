export const ROUTES = {
  root: () => "/",
  postDetail: (postsPath: string[]) => `/posts/${postsPath.join("/")}`,
};
