const fs = require("node:fs");
const path = require("node:path");

const resultsDir = process.env.GITHUB_WORKSPACE ?? "./";
const combinedResultsPath = path.join(resultsDir, "combined-test-results.json");

const findTestResults = (baseDirs) => {
  const results = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  baseDirs.forEach((baseDir) => {
    const fullBaseDirPath = path.join(resultsDir, baseDir);

    if (fs.existsSync(fullBaseDirPath) && fs.statSync(fullBaseDirPath).isDirectory()) {
      const subDirs = fs
        .readdirSync(fullBaseDirPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // biome-ignore lint/complexity/noForEach: <explanation>
      subDirs.forEach((subDir) => {
        const fullSubDirPath = path.join(fullBaseDirPath, subDir, "test-results.json");
        if (fs.existsSync(fullSubDirPath)) {
          const content = JSON.parse(fs.readFileSync(fullSubDirPath, "utf8"));
          content.repoPath = path.join(baseDir, subDir);
          results.push(content);
        }
      });
    }
  });

  return results;
};

const directoriesToCheck = ["apps", "packages"];
const testResults = findTestResults(directoriesToCheck);

fs.writeFileSync(combinedResultsPath, JSON.stringify(testResults, null, 2));
