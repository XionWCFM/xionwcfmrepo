import { toDate } from "date-fns";
import { z } from "zod";
import type { MdxRepositoryItem } from "~/shared/packages/collections/type";

export const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  canView: z.boolean(),
  createdAt: z.preprocess((value) => {
    if (typeof value === "string") {
      return toDate(value);
    }
    return value;
  }, z.date()),
});

export type ContentFrontmatter = z.infer<typeof contentSchema>;

export type ContentRepositoryItem = MdxRepositoryItem<ContentFrontmatter>;
