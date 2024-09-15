import { createRoutes } from "./internal/create-routes";

export const $Routes = {
  root: createRoutes("/"),
  onBoarding: createRoutes("/on-boarding"),
  problemSolve: createRoutes("/problem-solve"),
  enterName: createRoutes("/enter-name"),
  result: createRoutes<{
    query: {
      username: string;
    };
  }>("/result"),
};
