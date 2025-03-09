import type { Database } from "@repo/database/typesDb";
import { env } from "@repo/env";
import { SignJWT, decodeJwt as joseDecodeJwt, jwtVerify } from "jose";

export type JwtPayload = {
  google_id: string;
  mail: string;
  name: string;
  role: Database["public"]["Enums"]["role"];
};

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function generateJwt(payload: JwtPayload): Promise<string> {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("30d").sign(secret);
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return joseDecodeJwt(token) as JwtPayload;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}
