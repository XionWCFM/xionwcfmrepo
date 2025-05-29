export type MdxRepositoryItem<T> = {
  frontmatter: T;
  stats: { updatedAt: string; createdAt: string };
  fullPath: string;
  fileName: string;
  path: string;
};
