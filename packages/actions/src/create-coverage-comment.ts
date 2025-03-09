import { VITEST_COVERAGE_SIGNATURE_TEXT } from "./_internal/constant";
import type { VitestCoverageSummeryType } from "./_internal/vitest.type";

const createTableRow = (filePath: string, data: VitestCoverageSummeryType[string]): string => {
  const truncatedPath = filePath.split(/\/(apps|packages)\//);
  return `| ${truncatedPath[1]}/${truncatedPath[2]} | ${data?.statements?.pct?.toFixed(2)}% | ${data?.branches?.pct?.toFixed(2)}% | ${data?.functions?.pct?.toFixed(2)}% | ${data?.lines?.pct?.toFixed(2)}%  |\n`;
};

export const createCoverageComment = (coverage: VitestCoverageSummeryType) => {
  const total = coverage?.total;

  const totalCoverageTable = `
### Total Coverage 📊

| File   | Stmts | Branch   | Funcs   | Lines   |
|--------|-------:|-------:|-------:|-------:|
| Total  | ${total?.statements?.pct?.toFixed(2)}% | ${total?.branches?.pct?.toFixed(2)}% | ${total?.functions?.pct?.toFixed(2)}% | ${total?.lines?.pct?.toFixed(2)}% |

`;

  const fileCoverages = Object.entries(coverage)
    .filter(([key]) => key !== "total")
    .map(([filePath, fileCoverage]) => createTableRow(filePath, fileCoverage))
    .join("");

  return `
## 📊 Test Coverage Report

${totalCoverageTable}

<details>
<summary>📁 Detail Coverage</summary>

| File   | Stmts | Branch   | Funcs   | Lines    |
|------------|-------:|-------:|-------:|-------:|
${fileCoverages}

</details>


`;
};
export const combineCoverageComment = (coverages: VitestCoverageSummeryType[]) => {
  return `
  ## XionWCFM Coverage Report
  
  ${coverages.map((coverage) => createCoverageComment(coverage)).join("\n")}

  <details>
    <summary>Coverage</summary>
  🤖 SIGNATURE_KEY : ${VITEST_COVERAGE_SIGNATURE_TEXT}
  </details>
  `;
};
