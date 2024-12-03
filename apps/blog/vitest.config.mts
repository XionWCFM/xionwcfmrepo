import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react() as any, tsConfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["**/*.js", "**/*.mjs", "**/*.cjs"],
      reporter: ["text", "json-summary"],
    },
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.tsx"],
    include: ["**/*.test.+(ts|tsx|js)"],
    reporters: ["default", "json", "github-actions"],
    outputFile: "test-results.json",
    sequence: {
      shuffle: true,
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
      forks: {
        singleFork: true,
      },
    },
    maxConcurrency: 1,
  },
  resolve: {
    alias: {
      "~/public": "/public",
    },
  },
});
