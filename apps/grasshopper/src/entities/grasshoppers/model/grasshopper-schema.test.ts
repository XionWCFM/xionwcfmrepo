import { calculateProblemResult } from "./grasshopper.schema";

import type { GrasshopperQuestionAnswerType } from "./grasshopper.model";

describe("calculateProblemResult", () => {
  it("모든 문제를 맞춘 경우 올바른 결과를 반환해야 한다", () => {
    const mockQuestions: GrasshopperQuestionAnswerType[] = [
      {
        id: "1",
        type: "객관식",
        grasshopper: { id: "correct1", imgSrc: "", name: "정답 메뚜기 1" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct1", name: "정답 메뚜기 1" },
          { id: "wrong1", name: "오답 메뚜기 1" },
        ],
        selectedAnswerId: "correct1",
      },
      {
        id: "2",
        type: "객관식",
        grasshopper: { id: "correct2", imgSrc: "", name: "정답 메뚜기 2" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct2", name: "정답 메뚜기 2" },
          { id: "wrong2", name: "오답 메뚜기 2" },
        ],
        selectedAnswerId: "correct2",
      },
    ];

    const result = calculateProblemResult(mockQuestions);

    expect(result).toEqual({
      total: 2,
      answer: 2,
      wrong: 0,
      skip: 0,
    });
  });

  it("모든 문제를 틀린 경우 올바른 결과를 반환해야 한다", () => {
    const mockQuestions: GrasshopperQuestionAnswerType[] = [
      {
        id: "1",
        type: "객관식",
        grasshopper: { id: "correct1", imgSrc: "", name: "정답 메뚜기 1" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct1", name: "정답 메뚜기 1" },
          { id: "wrong1", name: "오답 메뚜기 1" },
        ],
        selectedAnswerId: "wrong1",
      },
      {
        id: "2",
        type: "객관식",
        grasshopper: { id: "correct2", imgSrc: "", name: "정답 메뚜기 2" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct2", name: "정답 메뚜기 2" },
          { id: "wrong2", name: "오답 메뚜기 2" },
        ],
        selectedAnswerId: "wrong2",
      },
    ];

    const result = calculateProblemResult(mockQuestions);

    expect(result).toEqual({
      total: 2,
      answer: 0,
      wrong: 2,
      skip: 0,
    });
  });

  it("일부 문제를 맞추고 일부 문제를 틀린 경우 올바른 결과를 반환해야 한다", () => {
    const mockQuestions: GrasshopperQuestionAnswerType[] = [
      {
        id: "1",
        type: "객관식",
        grasshopper: { id: "correct1", imgSrc: "", name: "정답 메뚜기 1" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct1", name: "정답 메뚜기 1" },
          { id: "wrong1", name: "오답 메뚜기 1" },
        ],
        selectedAnswerId: "correct1",
      },
      {
        id: "2",
        type: "객관식",
        grasshopper: { id: "correct2", imgSrc: "", name: "정답 메뚜기 2" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct2", name: "정답 메뚜기 2" },
          { id: "wrong2", name: "오답 메뚜기 2" },
        ],
        selectedAnswerId: "wrong2",
      },
    ];

    const result = calculateProblemResult(mockQuestions);

    expect(result).toEqual({
      total: 2,
      answer: 1,
      wrong: 1,
      skip: 0,
    });
  });

  it("일부 문제를 건너뛴 경우 올바른 결과를 반환해야 한다", () => {
    const mockQuestions: GrasshopperQuestionAnswerType[] = [
      {
        id: "1",
        type: "객관식",
        grasshopper: { id: "correct1", imgSrc: "", name: "정답 메뚜기 1" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct1", name: "정답 메뚜기 1" },
          { id: "wrong1", name: "오답 메뚜기 1" },
        ],
        selectedAnswerId: "correct1",
      },
      {
        id: "2",
        type: "객관식",
        grasshopper: { id: "correct2", imgSrc: "", name: "정답 메뚜기 2" },
        questionTitle: "이 메뚜기의 이름은?",
        choices: [
          { id: "correct2", name: "정답 메뚜기 2" },
          { id: "wrong2", name: "오답 메뚜기 2" },
        ],
        selectedAnswerId: null,
      },
    ];

    const result = calculateProblemResult(mockQuestions);

    expect(result).toEqual({
      total: 2,
      answer: 1,
      wrong: 0,
      skip: 1,
    });
  });
});
