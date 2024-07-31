import { combineTestComment, createTestComment } from "../create-test-comment";
import { MOCK_TEST_RESULTS } from "../mocks/mock-test-results";

describe("Createtestcomment를 테스트합니다.", () => {
  it("Createtestcomment는", () => {
    expect(true).toBe(true);
  });
  it("CombineTestComment는", () => {
    console.log(combineTestComment([MOCK_TEST_RESULTS, MOCK_TEST_RESULTS]));
  });
});
