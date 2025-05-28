import { z } from "zod";

export const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  canView: z.boolean(),
});

export type ContentFrontmatter = z.infer<typeof contentSchema>;
