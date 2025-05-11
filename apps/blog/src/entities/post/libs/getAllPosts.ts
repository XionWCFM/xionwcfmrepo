import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { toDate } from "~/shared/utils/date/toDate";
import type { FrontmatterType, PostWithFrontmatterType } from "../model/post.model";
import type { PostType } from "../model/post.model";
const POST_REPOSITORY_FOLDER_NAME = "posts";

const getPostsDirectory = () => {
  return path.join(process.cwd(), POST_REPOSITORY_FOLDER_NAME);
};

const readDirectory = (directory: string): Pick<PostType, "filePath">[] => {
  const postsDirectory = getPostsDirectory();
  return fs.readdirSync(directory, { withFileTypes: true }).reduce<Pick<PostType, "filePath">[]>((posts, file) => {
    const fullPath = path.join(directory, file.name);
    if (file.isDirectory()) {
      return posts.concat(readDirectory(fullPath));
    }
    if (file.isFile() && path.extname(file.name) === ".mdx") {
      const filePath = fullPath
        .replace(postsDirectory, "")
        .replace(/^\/+/, "")
        .replace(/\.mdx$/, "")
        .split("/");
      posts.push({ filePath });
    }
    return posts;
  }, []);
};

const findPostFile = (directory: string, filePath: string[]): PostType | null => {
  const fullPath = path.join(directory, ...filePath);
  const fileExtensions = [".md", ".mdx"];
  for (const ext of fileExtensions) {
    const fullFilePath = `${fullPath}${ext}`;
    if (fs.existsSync(fullFilePath)) {
      const content = fs.readFileSync(fullFilePath, "utf8");
      const category = filePath[0] ?? "unknown";
      return { content, filePath, category };
    }
  }
  return null;
};

export const canViewPost = (frontmatter: Pick<FrontmatterType, "canView">) => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return frontmatter.canView;
};

export const getFrontmatter = async (source: string): Promise<FrontmatterType> => {
  const { frontmatter } = await compileMDX<FrontmatterType>({
    source,
    options: { parseFrontmatter: true },
  });
  return frontmatter;
};

export const getPost = async (filePath: string[]): Promise<PostWithFrontmatterType | null> => {
  const postsDirectory = getPostsDirectory();
  const post = findPostFile(postsDirectory, filePath);

  if (!post) {
    return null;
  }

  const frontmatter = await getFrontmatter(post.content);

  if (!canViewPost(frontmatter)) {
    return null;
  }

  return Object.assign(post, frontmatter);
};

export const getAllPosts = async () => {
  const postsDirectory = getPostsDirectory();
  const posts = await Promise.all(readDirectory(postsDirectory).map((path) => getPost(path.filePath)));
  const validPosts = posts.filter((post) => post !== null && canViewPost(post)) as PostWithFrontmatterType[];
  return validPosts;
};

export const getAllPostsSortedByReleaseDate = async () => {
  const posts = await getAllPosts();

  posts.sort((a, b) => {
    const dateA = toDate(a.createdAt).getTime();
    const dateB = toDate(b.createdAt).getTime();
    return dateB - dateA;
  });

  return posts;
};
