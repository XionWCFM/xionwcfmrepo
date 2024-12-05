import { shuffle } from "es-toolkit/array";
import { GRASSHOPPER_WITH_NO_IMAGE } from "server/grasshopper/grasshopper.data";
import type { GrasshopperQuestion } from "~/entities/grasshoppers/model/grasshopper.model";
import type { GrasshopperQuestionVariants } from "~/entities/grasshoppers/model/grasshopper.model";
import type { Grasshopper } from "../../src/entities/grasshoppers/model/grasshopper.model";

export const createGrasshopperQuestion = (
  grasshoppers: Grasshopper[],
  options?: { type?: GrasshopperQuestionVariants; limit?: number },
): GrasshopperQuestion[] => {
  const { type = "객관식", limit = grasshoppers.length } = options ?? {};
  const choiceCount = 5;

  const shuffledList = shuffle(grasshoppers)
    .slice(0, limit)
    .map((grasshopper) => {
      const otherGrasshoppers = grasshoppers.filter((g) => g.id !== grasshopper.id).concat(GRASSHOPPER_WITH_NO_IMAGE);
      const randomChoices = shuffle(otherGrasshoppers).slice(0, choiceCount - 1);
      const choices = shuffle([grasshopper, ...randomChoices]);
      const id = Math.random().toString().slice(0, 16);
      const questionTitle = "이 메뚜기의 이름은 무엇일까요?";
      return { type, grasshopper, choices, id, questionTitle };
    }) satisfies GrasshopperQuestion[];

  return shuffledList;
};
