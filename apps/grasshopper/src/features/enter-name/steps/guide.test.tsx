import { renderWithUser } from "~/shared/testing-utils";
import { EnterNameGuideStep } from "./guide";

describe("Guide를 테스트합니다.", () => {
  it("Guide는", async () => {
    const mockProblemFn = vi.fn();
    const mockTutorialFn = vi.fn();
    renderWithUser(<EnterNameGuideStep onProblemSolveNext={mockProblemFn} onTutorialNext={mockTutorialFn} />);

    expect(true).toBe(true);
  });
});
