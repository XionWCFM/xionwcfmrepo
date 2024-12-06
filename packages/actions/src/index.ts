import fs from "node:fs";
import path from "node:path";
import { combineResults } from "./_internal/combine-results";
import {
  VITEST_COMBINED_COVERAGE_FILE_NAME,
  VITEST_COMBINED_RESULTS_FILE_NAME,
  VITEST_COVERAGE_FILE_NAME,
  VITEST_COVERAGE_SIGNATURE_TEXT,
  VITEST_TEST_RESULTS_FILE_NAME,
  VITEST_TEST_RESULTS_SIGNATURE_TEXT,
} from "./_internal/constant";
import { createOrUpdateComment } from "./_internal/create-or-update-comment";
import type { VitestCoverageSummeryType, VitestTestResultsType } from "./_internal/vitest.type";
import { combineCoverageComment } from "./create-coverage-comment";
import { combineTestComment } from "./create-test-comment";

const checkDirectoryList = ["apps", "packages"];

const createGithubTestComment = async (githubContext: { github: any; context: any }) => {
  const baseDir = process.env.GITHUB_WORKSPACE || "./";
  const combinedResultsPath = path.join(baseDir, VITEST_COMBINED_RESULTS_FILE_NAME);
  const combinedTestResults = combineResults<VitestTestResultsType>({
    baseDir,
    checkDirectoryList,
    fileName: VITEST_TEST_RESULTS_FILE_NAME,
  });
  fs.writeFileSync(combinedResultsPath, JSON.stringify(combinedTestResults, null, 2));
  if (process.env.CI) {
    await createOrUpdateComment(
      combineTestComment(combinedTestResults),
      VITEST_TEST_RESULTS_SIGNATURE_TEXT,
      githubContext,
    );
  }
};

const createGithubCoverageComment = async (githubContext: { github: any; context: any }) => {
  const baseDir = process.env.GITHUB_WORKSPACE || "./";
  const combinedResultsPath = path.join(baseDir, VITEST_COMBINED_COVERAGE_FILE_NAME);
  const combineCoverageResults = combineResults<VitestCoverageSummeryType>({
    baseDir,
    checkDirectoryList,
    fileName: VITEST_COVERAGE_FILE_NAME,
  });

  fs.writeFileSync(combinedResultsPath, JSON.stringify(combineCoverageResults, null, 2));

  if (process.env.CI) {
    await createOrUpdateComment(
      combineCoverageComment(combineCoverageResults),
      VITEST_COVERAGE_SIGNATURE_TEXT,
      githubContext,
    );
  }
};

export const createXionWcfmComment = async (githubContext: { github: any; context: any }) => {
  createGithubTestComment(githubContext);
  createGithubCoverageComment(githubContext);
};
