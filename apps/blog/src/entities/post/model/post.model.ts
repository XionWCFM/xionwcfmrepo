export type PostType = {
  content: string;
  filePath: string[];
};

export const CATEGORIES_LIST = ["react", "nextjs", "frontend"] as const;
export type CategoriesType = (typeof CATEGORIES_LIST)[number];
export type AuthorityType = "public" | "permission" | "private";

export type FrontmatterType = {
  title: string;
  description: string;
  thumbnail: string;
  categories: CategoriesType;
  writeDate: string;
  releaseDate: string;
  canView: boolean;
  authority: AuthorityType;
};

export type PostWithFrontmatterType = PostType & FrontmatterType;
