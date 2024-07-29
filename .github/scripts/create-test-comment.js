const fs = require("node:fs");
const path = require("node:path");

const createTestResultText = (value) => {
  return value
    .map((testSuites) => {
      const testAssertion = testSuites.success
        ? "✅ 모두 통과했어요!"
        : testSuites.testResults
            .filter((testResult) => testResult.status === "failed")
            .map((testResult) =>
              testResult.assertionResults
                .filter((assertion) => assertion.status === "failed")
                .map(
                  (assertion) => `
            🔴 테스트 이름: ${assertion.fullName}
            ❌ 실패 메시지: ${assertion.failureMessages.join("\n")}
          `,
                )
                .join("\n"),
            )
            .join("\n");

      return `
🤖 [${testSuites.repoPath}]에 대한 테스트 결과에요!
          
${testSuites.success ? "✅ 테스트 통과" : "❌ 테스트 실패"}
  
| 📊 전체 테스트 수 | ✅ 성공한 테스트 수 | ❌ 실패한 테스트 수 |
|------------------|---------------------|---------------------|
| ${testSuites.numTotalTests} | ${testSuites.numPassedTests} | ${testSuites.numFailedTests} |

실패한 테스트 목록:
${testAssertion}
          `;
    })
    .join("\n\n");
};

module.exports = async ({ github, context }) => {
  try {
    const testResultPath = path.join(process.env.GITHUB_WORKSPACE ?? "./", "combined-test-results.json");
    const result = fs.readFileSync(testResultPath, "utf8");
    const testResults = JSON.parse(result);
    const comment = createTestResultText(testResults);
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const issueNumber = context.issue.number;

    github.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body: comment,
    });
  } catch (error) {
    console.error(error);
  }
};
