import { sample, shuffle } from "es-toolkit/array";
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
      const otherGrasshoppers = grasshoppers.filter((g) => g.id !== grasshopper.id);
      const randomChoices = shuffle(otherGrasshoppers).slice(0, choiceCount - 1);
      const choices = shuffle([grasshopper, ...randomChoices]);
      return [{ type, grasshopper, choices }] satisfies GrasshopperQuestionType[];
    });

  return [];
};
