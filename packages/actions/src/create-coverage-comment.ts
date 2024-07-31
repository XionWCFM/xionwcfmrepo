import { VITEST_COVERAGE_FILE_NAME, VITEST_COVERAGE_SIGNATURE_TEXT } from "./_internal/constant";
import type { VitestCoverageSummeryType } from "./_internal/vitest.type";

export const createCoverageComment = (coverage: VitestCoverageSummeryType) => {
  const total = coverage.total;

  const createTableRow = (title: string, data: any): string => {
    return `| ${title} | ${data.total} | ${data.covered} | ${data.skipped} | ${data.pct.toFixed(2)}% |\n`;
  };

  const totalCoverageTable = `
  ### 총 커버리지 📊
  
  | 항목       | 총계   | 커버된 수 | 스킵된 수 | 퍼센트   |
  |------------|-------:|---------:|---------:|---------:|
  ${createTableRow("라인", total.lines)}
  ${createTableRow("명령문", total.statements)}
  ${createTableRow("함수", total.functions)}
  ${createTableRow("분기", total.branches)}
  `;

  const fileCoverages = Object.entries(coverage)
    .filter(([key]) => key !== "total")
    .map(([filePath, fileCoverage]) => {
      return `
  #### ${filePath} 📁
  
  | 항목       | 총계   | 커버된 수 | 스킵된 수 | 퍼센트   |
  |------------|-------:|---------:|---------:|---------:|
  ${createTableRow("라인", fileCoverage.lines)}
  ${createTableRow("명령문", fileCoverage.statements)}
  ${createTableRow("함수", fileCoverage.functions)}
  ${createTableRow("분기", fileCoverage.branches)}
  `;
    })
    .join("\n");

  return `
  ## 📊 테스트 커버리지 리포트
  
  ${totalCoverageTable}
  
  ${fileCoverages}
  
  ${VITEST_COVERAGE_SIGNATURE_TEXT}
  `;
};
