import qs from "qs";
import * as z from "zod";
import { decrypt } from "~/shared/utils/crypto";

const resultPageSearchParamsSchema = z
  .object({
    data: z.string(),
  })
  .transform(({ data }) => {
    const decrypted = decrypt(data);
    return z
      .object({ userName: z.string(), answer: z.number(), wrong: z.number(), skip: z.number(), total: z.number() })
      .parse(decrypted);
  });

export const getResultPageSearchParamsData = (searchParams: URLSearchParams) => {
  return resultPageSearchParamsSchema.parse(qs.parse(searchParams.toString(), { parseArrays: true }));
};
