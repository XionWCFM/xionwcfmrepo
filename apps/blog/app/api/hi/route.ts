import { decodeJwt } from "@repo/auth/jwt";
import { cookies } from "next/dist/server/request/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get("session_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "no token" });
  }
  const payload = decodeJwt(token);
  return NextResponse.json({ message: "hi", payload });
}
