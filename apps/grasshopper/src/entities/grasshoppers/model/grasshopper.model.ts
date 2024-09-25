export type Grasshopper = {
  id: string;
  imgSrc: string;
  name: string;
};
export type GrasshopperQuestion = {
  id: string;
  type: GrasshopperQuestionVariants;
  grasshopper: Grasshopper;
  questionTitle: string;
  choices: Omit<Grasshopper, "imgSrc">[];
};

export type GrasshopperQuestionVariants = "객관식";

export type GrasshopperQuestionAnswerType = GrasshopperQuestion & { selectedAnswerId: string | null };
