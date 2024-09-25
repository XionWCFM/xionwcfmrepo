import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithUser, textContentMatcher } from "~/shared/testing-utils";
import { ProblemSolveInformationStep } from "./information";

describe("ProblemSolveInformationStep", () => {
  it("메뚜기 퀴즈 정보를 올바르게 표시합니다", () => {
    const mockOnProblemSolveNext = vi.fn();
    renderWithUser(<ProblemSolveInformationStep onProblemSolveNext={mockOnProblemSolveNext} />);

    expect(screen.getByText(textContentMatcher("메뚜기 퀴즈는 이렇게 진행돼요"))).toBeInTheDocument();
    expect(screen.getByText(textContentMatcher("총 35개의 문제가 주어져요"))).toBeInTheDocument();
    expect(screen.getByText(textContentMatcher("문제는 모두 객관식으로 이루어져있어요"))).toBeInTheDocument();
    expect(screen.getByText(textContentMatcher("문제를 다 풀지 않고 제출해도 괜찮아요"))).toBeInTheDocument();
    expect(screen.getByText(textContentMatcher("문제를 그만 풀고 싶다면 X 버튼을 눌러요"))).toBeInTheDocument();
    expect(screen.getByText(textContentMatcher("그게 다에요! 이제 풀어볼까요?"))).toBeInTheDocument();
  });

  it("문제 풀기 버튼을 클릭하면 onProblemSolveNext 함수가 호출됩니다", async () => {
    const mockOnProblemSolveNext = vi.fn();
    const { user } = renderWithUser(<ProblemSolveInformationStep onProblemSolveNext={mockOnProblemSolveNext} />);

    const solveButton = screen.getByText("문제 풀기");
    await user.click(solveButton);

    expect(mockOnProblemSolveNext).toHaveBeenCalledTimes(1);
  });
});
