import { CreateEnvReturn, SupportEnv } from "./create-env-d-ts";
import { splitEnv } from "./split-env";

export const createEnvToZod = (input: string, type: SupportEnv): CreateEnvReturn => {
  try {
    return {
      success: true,
      data: createZodCode(input, type),
    };
  } catch (e) {
    return { success: false };
  }
};

const createZodCode = (input: string, type: SupportEnv) => {
  const IMPORT_MAP: Record<SupportEnv, string> = {
    node: "process.env",
    vite: "import.meta.env",
  };

  const DECLARE_MAP: Record<SupportEnv, string> = {
    node: `declare global {
        namespace NodeJS {
        interface ProcessEnv extends TypeOf<typeof zodEnv> {}
    }`,
    vite: `
        declare interface ImportMetaEnv extends TypeOf<typeof zodEnv> {}
    `,
  };

  return `import { z, TypeOf } from "zod"
    const zodEnv = z.object({
    ${splitEnv(input)
      .map(([key, value]) => `${key}:${calculateZodSchema(value)}`)
      .join("\n")}
    })

    ${DECLARE_MAP[type]}

    zodEnv.parse(${IMPORT_MAP[type]})
      
    `;
};

const calculateZodSchema = (input: string) => {
  const TRUE = "true";
  const FALSE = "false";

  if (!Number.isNaN(Number.parseInt(input))) {
    return "z.number()";
  }

  if (input === TRUE || input === FALSE) {
    return "z.boolean()";
  }
  return "z.string()";
};
