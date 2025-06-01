import { MdxRepository } from "~/shared/packages/collections";
import { contentSchema } from "./contents.schema";

const contentsDir = "contents";

export const contentsRepository = new MdxRepository({
  globPattern: "**/*.mdx",
  rootDir: contentsDir,
  validate: (value) => {
    return contentSchema.parse(value);
  },
  sortBy: (a, b) => {
    return new Date(b.frontmatter.createdAt).getTime() - new Date(a.frontmatter.createdAt).getTime();
  },
  filterBy: (item) => {
    return item.frontmatter.canView;
  },
});
