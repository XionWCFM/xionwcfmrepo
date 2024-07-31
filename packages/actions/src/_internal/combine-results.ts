import fs from "node:fs";
import path from "node:path";

type CombineResultsParams = {
  fileName: string;
  checkDirectoryList: string[];
  baseDir: string;
};

export const combineResults = <T>(param: CombineResultsParams): T[] => {
  const { fileName, checkDirectoryList, baseDir } = param;
  const results: T[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  checkDirectoryList.forEach((checkDirectory) => {
    const fullBaseDirPath = path.join(baseDir, checkDirectory);

    if (fs.existsSync(fullBaseDirPath) && fs.statSync(fullBaseDirPath).isDirectory()) {
      const subDirs = fs
        .readdirSync(fullBaseDirPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // biome-ignore lint/complexity/noForEach: <explanation>
      subDirs.forEach((subDir) => {
        const fullSubDirPath = path.join(fullBaseDirPath, subDir, fileName);
        if (fs.existsSync(fullSubDirPath)) {
          const content = JSON.parse(fs.readFileSync(fullSubDirPath, "utf8"));
          content.repoPath = path.join(checkDirectory, subDir);
          results.push(content);
        }
      });
    }
  });
  return results;
};
