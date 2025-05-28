import { MdxRepository } from "~/shared/packages/collections";
import { contentSchema } from "./contents.schema";

const contentsDir = "contents";

export const contentsRepository = new MdxRepository({
  globPattern: "**/*.mdx",
  rootDir: contentsDir,
  validate: (value) => contentSchema.parse(value),
});
