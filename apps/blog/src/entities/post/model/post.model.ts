export type PostType = {
  content: string;
  category: string;
  filePath: string[];
};

export type FrontmatterType = {
  title: string;
  description: string;
  createdAt: string;
  canView: boolean;
};

export type PostWithFrontmatterType = PostType & FrontmatterType;
