import fs from "node:fs";
import path from "node:path";

interface DirectoryEntry {
  name: string;
  isDirectory: boolean;
  children?: DirectoryEntry[];
}

const POSTS_DIR = path.join(process.cwd(), "posts");

function createPostRoutes(entries: DirectoryEntry[], parentPath = ""): string[] {
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory) {
      const currentPath = parentPath ? `${parentPath}/${entry.name}` : entry.name;

      if (entry.children) {
        routes.push(...createPostRoutes(entry.children, currentPath));
      }
    } else {
      const fileName = path.parse(entry.name).name;
      const postPath = parentPath ? `/posts/${parentPath}/${fileName}` : `/posts/${fileName}`;
      routes.push(postPath);
    }
  }

  return routes;
}

function getDirectoryStructure(dir: string): DirectoryEntry[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.map((entry) => ({
    name: entry.name,
    isDirectory: entry.isDirectory(),
    children: entry.isDirectory() ? getDirectoryStructure(path.join(dir, entry.name)) : undefined,
  }));
}

export function getPostPaths() {
  const routes: string[] = [];

  const postsStructure = getDirectoryStructure(POSTS_DIR);
  routes.push(...createPostRoutes(postsStructure));

  return routes;
}
