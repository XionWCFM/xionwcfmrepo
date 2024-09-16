import { GrasshopperType } from "../../../entities/grasshoppers/model/grasshopper.model";

export type GrasshopperQuestionVariantsType = "객관식";

export type GrasshopperQuestionType = {
  id: string;
  type: GrasshopperQuestionVariantsType;
  grasshopper: GrasshopperType;
  questionTitle: string;
  choices: Omit<GrasshopperType, "imgSrc">[];
};
