import { splitEnv } from "./split-env";
export type SupportEnv = "node" | "vite";

export type CreateEnvReturn =
  | {
      success: true;
      data: string;
    }
  | {
      success: false;
    };

export const createEnvDTs = (input: string, type: SupportEnv): CreateEnvReturn => {
  try {
    return {
      success: true,
      data: createEnvCode(input, type),
    };
  } catch (e) {
    return { success: false };
  }
};

const createEnvCode = (str: string, type: SupportEnv) => {
  if (type === "node") {
    return `declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ${splitEnv(str)
              .map(([key, value]) => `${key}:${calculateType(value)}`)
              .join("\n            ")}
    }
  }
}`;
  }
  if (type === "vite") {
    return `declare interface ImportMetaEnv {
      ${splitEnv(str)
        .map(([key, value]) => `readonly ${key}:${calculateType(value)}`)
        .join("\n")}
    }
  }
}`;
  }
  throw new Error("unexpected env type error");
};

const calculateType = (input: string) => {
  const TRUE = "true";
  const FALSE = "false";

  if (!Number.isNaN(Number.parseInt(input))) {
    return "number";
  }

  if (input === TRUE || input === FALSE) {
    return "boolean";
  }
  return "string";
};
