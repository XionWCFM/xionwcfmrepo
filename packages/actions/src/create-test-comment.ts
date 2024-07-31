import { VITEST_TEST_RESULTS_SIGNATURE_TEXT } from "./_internal/constant";
import type { VitestTestResultsType } from "./_internal/vitest.type";

export const createTestComment = (testObject: VitestTestResultsType) => {
  const getEmoji = (status: string) => (status === "passed" ? "✅" : "❌");

  const testSuiteMap = testObject.testResults.map((testResult) => {
    const testStatus = `${getEmoji(testResult.status)} ${testResult.assertionResults[0]?.ancestorTitles[0]}`;
    const testTime = `${testResult.endTime - testResult.startTime}ms`;
    const assertionResult = testResult.assertionResults.map((assertion) => {
      return `- ${getEmoji(assertion.status)} ${assertion.title}`;
    });
    return `
    ${testStatus} | ${testTime}    

    ${assertionResult.join("\n    ")}
    `;
  });

  const total = `
  ### ${testObject.success ? "✅" : "❌"} ${testObject.repoPath} : Total Test Results

  | All Monorepo Metric | All Monorepo Value |
  |---|---|
  | 😈 Total TestSuites  | ${testObject.numTotalTestSuites} |
  | ✅ Total Passed TestSuites | ${testObject.numPassedTestSuites} |
  | ❌ Total Failed TestSuites | ${testObject.numFailedTestSuites} |
  `;

  return `
  ${total}

  <details>
    ${testSuiteMap.join("\n")}
  </details>

  `;
};

export const combineTestComment = (testObjects: VitestTestResultsType[]) => {
  const allTestResults = testObjects.reduce(
    (acc, cur) => {
      acc.total += cur.numTotalTests;
      acc.passed += cur.numPassedTests;
      acc.failed += cur.numFailedTests;
      return acc;
    },
    { total: 0, passed: 0, failed: 0 },
  );
  const result = testObjects.map((testObject) => createTestComment(testObject)).join("\n");
  return `
  # XionWCFM Test Results

  | Metric | Value |
  |---|---|
  | 😈 Total TestSuites  | ${allTestResults.total} |
  | ✅ Total Passed TestSuites | ${allTestResults.passed} |
  | ❌ Total Failed TestSuites | ${allTestResults.failed} |
  

  <details>
    <summary>Test Detail</summary>
    ${result}
  <details/>

  🤖 SIGNATURE_KEY : ${VITEST_TEST_RESULTS_SIGNATURE_TEXT}
  `;
};
