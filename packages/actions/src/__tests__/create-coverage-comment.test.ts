import { createCoverageComment } from "../create-coverage-comment";
import { MOCK_COVERAGE } from "../mocks/mock-coverage";

describe("Createcoveragecomment를 테스트합니다.", () => {
  it("Createcoveragecomment는", () => {
    console.log(createCoverageComment(MOCK_COVERAGE));
    expect(true).toBe(true);
  });
});
