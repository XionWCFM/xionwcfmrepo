import { Grasshopper } from "../../../entities/grasshoppers/model/grasshopper.model";

export type GrasshopperQuestionVariantsType = "객관식";

export type GrasshopperQuestionType = {
  id: string;
  type: GrasshopperQuestionVariantsType;
  grasshopper: Grasshopper;
  questionTitle: string;
  choices: Omit<Grasshopper, "imgSrc">[];
};
