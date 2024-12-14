import { verifyJwt } from "@repo/auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const payload = await verifyJwt(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (payload.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// 미들웨어 적용 대상: (admin) 라우트 그룹
export const config = {
  matcher: ["/write/:path*"],
};
