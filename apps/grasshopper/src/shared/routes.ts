import { ProblemSolveResultType } from "~/features/problem-solve/problem-solve-funnel";
import { createRoutes } from "./internal/create-routes";

export const $Routes = {
  root: createRoutes("/"),
  tutorial: createRoutes("/tutorial"),
  problemSolve: createRoutes("/problem-solve"),
  enterName: createRoutes("/enter-name"),
  result: createRoutes<{
    query: {
      username: string;
      result: ProblemSolveResultType[];
    };
  }>("/result"),
};
