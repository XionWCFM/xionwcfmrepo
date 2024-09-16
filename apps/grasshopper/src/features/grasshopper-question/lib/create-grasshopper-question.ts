import { shuffle } from "es-toolkit/array";
import { GrasshoppersWithNoImage } from "~/entities/grasshoppers/api/grasshopper.data";
import { GrasshopperType } from "../../../entities/grasshoppers/model/grasshopper.model";
import { GrasshopperQuestionType, GrasshopperQuestionVariantsType } from "../model/grasshopper-question.model";

export const createGrasshopperQuestion = (
  grasshoppers: GrasshopperType[],
  options?: { type?: GrasshopperQuestionVariantsType; limit?: number },
): GrasshopperQuestionType[] => {
  const { type = "객관식", limit = grasshoppers.length } = options ?? {};
  const choiceCount = 5;

  const shuffledList = shuffle(grasshoppers)
    .slice(0, limit)
    .map((grasshopper) => {
      const otherGrasshoppers = grasshoppers.filter((g) => g.id !== grasshopper.id).concat(GrasshoppersWithNoImage);
      const randomChoices = shuffle(otherGrasshoppers).slice(0, choiceCount - 1);
      const choices = shuffle([grasshopper, ...randomChoices]);
      const id = Math.random().toString().slice(0, 16);
      const questionTitle = "이 메뚜기의 이름은 무엇일까요?";
      return { type, grasshopper, choices, id, questionTitle };
    }) satisfies GrasshopperQuestionType[];

  return shuffledList;
};
