import { GrasshopperType } from "../../../entities/grasshoppers/model/grasshopper.model";

export type GrasshopperQuestionVariantsType = "객관식";

export type GrasshopperQuestionType = {
  type: GrasshopperQuestionVariantsType;
  grasshopper: GrasshopperType;
  choices: Omit<GrasshopperType, "imgSrc">[];
};
