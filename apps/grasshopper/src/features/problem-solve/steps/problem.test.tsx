import { screen } from "@testing-library/react";
import { useState } from "react";
import { GrasshopperQuestionAnswerType } from "~/entities/grasshoppers/model/grasshopper.model";
import { renderWithUser } from "~/shared/testing-utils";
import { ProblemSolveProblemStep } from "./problem";

const mockGrasshopperQuestions: GrasshopperQuestionAnswerType[] = [
  {
    id: "1",
    questionTitle: "첫 번째 문제",
    type: "객관식",
    grasshopper: { id: "correct1", name: "정답 메뚜기1", imgSrc: "/path/to/image1.jpg" },
    choices: [
      { id: "correct1", name: "정답 메뚜기1" },
      { id: "wrong1", name: "오답 메뚜기1" },
    ],
    selectedAnswerId: null,
  },
  {
    id: "2",
    questionTitle: "두 번째 문제",
    type: "객관식",
    grasshopper: { id: "correct2", name: "정답 메뚜기2", imgSrc: "/path/to/image2.jpg" },
    choices: [
      { id: "correct2", name: "정답 메뚜기2" },
      { id: "wrong2", name: "오답 메뚜기2" },
    ],
    selectedAnswerId: null,
  },
];

describe("ProblemSolveProblemStep", () => {
  const mockOnResultNext = vi.fn();
  const mockOnAnswerClick = vi.fn();
  const Component = () => {
    const [state, setState] = useState(mockGrasshopperQuestions);
    return (
      <ProblemSolveProblemStep
        onResultNext={mockOnResultNext}
        grasshopperQuestions={state}
        userName="테스트 유저"
        onAnswerClick={(param) => {
          setState((prev) =>
            prev.map((item) =>
              item.id === param.quizId ? { ...item, selectedAnswerId: param.selectedAnswerId } : item,
            ),
          );
          mockOnAnswerClick(param);
        }}
      />
    );
  };
  const renderComponent = () => {
    return renderWithUser(<Component />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("첫 번째 문제가 올바르게 렌더링되는지 확인", () => {
    renderComponent();
    expect(screen.getByText("Q.1 첫 번째 문제")).toBeTruthy();
    expect(screen.getByText("테스트 유저님은 지금까지 2문제 중 0문제를 풀었어요")).toBeInTheDocument();
  });

  it("답변 선택 시 onAnswerClick이 호출되는지 확인", async () => {
    const { user } = renderComponent();
    const answerButton = screen.getByText("정답 메뚜기1");
    await user.click(answerButton);
    expect(mockOnAnswerClick).toHaveBeenCalledWith({ quizId: "1", selectedAnswerId: "correct1" });
  });

  it("마지막 문제에서 제출 버튼 텍스트가 변경되는지 확인", async () => {
    const { user } = renderComponent();
    await user.click(await screen.findByText("오답 메뚜기1"));
    await user.click(await screen.findByText("제출하기"));
    screen.getByText("제출하고 결과지 보기");
  });

  it("답변을 선택하지 않았을 때 제출 버튼이 비활성화되는지 확인", () => {
    renderComponent();
    expect(screen.getByText("제출하기")).toBeDisabled();
  });

  it("답변을 선택했을 때 제출 버튼이 활성화되는지 확인", async () => {
    const { user } = renderComponent();
    await user.click(screen.getByText("정답 메뚜기1"));
    expect(screen.getByText("제출하기")).toBeEnabled();
  });

  it("제출 후 정답 토스트가 표시되는지 확인", async () => {
    const { user } = renderComponent();
    await user.click(screen.getByText("정답 메뚜기1"));
    await user.click(screen.getByText("제출하기"));
    expect(await screen.findByText("정답이에요! 🔥")).toBeInTheDocument();
  });

  it("제출 후 오답 토스트가 표시되는지 확인", async () => {
    const { user } = renderComponent();
    await user.click(screen.getByText("오답 메뚜기1"));
    await user.click(screen.getByText("제출하기"));
    expect(await screen.findByText("정답은 정답 메뚜기1였어요 😭")).toBeInTheDocument();
  });

  it("진행 상황 텍스트가 올바르게 업데이트되는지 확인", async () => {
    const { user } = renderComponent();
    expect(screen.getByText("테스트 유저님은 지금까지 2문제 중 0문제를 풀었어요")).toBeInTheDocument();
    await user.click(screen.getByText("정답 메뚜기1"));
    await user.click(screen.getByText("제출하기"));
    expect(screen.getByText("테스트 유저님은 지금까지 2문제 중 1문제를 풀었어요")).toBeInTheDocument();
  });
});
