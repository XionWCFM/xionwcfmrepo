import fs from "node:fs";
import path from "node:path";

type CombineResultsParams = {
  fileName: string;
  checkDirectoryList: string[];
  baseDir: string;
};

const findFilesRecursively = (dir: string, fileName: string): string[] => {
  const results: string[] = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results.push(...findFilesRecursively(filePath, fileName));
    } else if (file.name === fileName) {
      results.push(filePath);
    }
  });

  return results;
};

export const combineResults = <T>(param: CombineResultsParams): T[] => {
  const { fileName, checkDirectoryList, baseDir } = param;
  const results: T[] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  checkDirectoryList.forEach((checkDirectory) => {
    const fullBaseDirPath = path.join(baseDir, checkDirectory);

    if (fs.existsSync(fullBaseDirPath) && fs.statSync(fullBaseDirPath).isDirectory()) {
      const filePaths = findFilesRecursively(fullBaseDirPath, fileName);

      // biome-ignore lint/complexity/noForEach: <explanation>
      filePaths.forEach((filePath) => {
        const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const relativePath = path.relative(baseDir, filePath);
        content.repoPath = path.dirname(relativePath);
        results.push(content);
      });
    }
  });

  return results;
};
