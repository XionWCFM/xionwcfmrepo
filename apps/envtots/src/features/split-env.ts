export const splitEnv = (input: string): [string, string][] => {
  return input
    .split("\n")
    .filter((envText) => envText !== "")
    .map((envText) => {
      const result = envText.trim().split("=");
      if (result.length !== 2) {
        throw new Error("unexpected value");
      }
      return result as [string, string];
    });
};
