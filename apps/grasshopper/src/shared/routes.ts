import { createRoutes } from "./internal/create-routes";

export const $Routes = {
  root: createRoutes("/"),
  tutorial: createRoutes("/tutorial"),
  problemSolve: createRoutes("/problem-solve"),
  enterName: createRoutes("/enter-name"),
  result: createRoutes<{
    query: {
      data: string;
    };
  }>("/result"),
};
