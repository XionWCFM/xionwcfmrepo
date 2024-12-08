import jwt from "jsonwebtoken";

import type { Database } from "@repo/database/typesDb";
import { env } from "@repo/env";

const secret = env.JWT_SECRET; // 환경 변수에서 비밀 키를 가져옴

export type JwtPayload = {
  google_id: string;
  mail: string;
  name: string;
  role: Database["public"]["Enums"]["role"];
};

export function generateJwt(payload: JwtPayload) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (_err) {
    return null;
  }
}
