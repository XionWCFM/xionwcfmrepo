import { type GoogleClaim, google } from "@repo/auth/google";
import { generateJwt } from "@repo/auth/jwt";
import { createServerSupabaseClient } from "@repo/database/server";
import { env } from "@repo/env";
import { decodeIdToken } from "arctic";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const result = getSearchParams(req.url);

  if (!result.success) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/login?error=invalid_request`);
  }
  const { code, state } = result;

  const storedState = req.cookies.get("google_oauth_state")?.value;
  const codeVerifier = req.cookies.get("google_code_verifier")?.value;

  if (state !== storedState || !codeVerifier) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/login?error=invalid_state`);
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const idToken = tokens.idToken();
    const { sub: googleId, email, name, picture } = decodeIdToken(idToken) as GoogleClaim;

    const cookie = await cookies();
    const supabase = await createServerSupabaseClient(cookie);
    const { error } = await supabase.from("users").upsert(
      [
        {
          google_id: googleId,
          email,
          name,
          picture,
        },
      ],
      { onConflict: "google_id" },
    );

    if (error) {
      return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/login?error=authentication_failed`);
    }

    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("google_id, role")
      .eq("google_id", googleId)
      .single();

    if (fetchError) {
      return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/login?error=authentication_failed`);
    }

    const jwtToken = generateJwt({
      google_id: googleId,
      mail: email,
      name,
      role: userData?.role ?? "viewer",
    });

    cookie.set("session_token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}`);
  } catch (_error) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/login?error=authentication_failed`);
  }
}

const schema = z.string().min(1);

const getSearchParams = (url: string) => {
  try {
    const { searchParams } = new URL(url);
    return {
      success: true,
      code: schema.parse(searchParams.get("code")),
      state: schema.parse(searchParams.get("state")),
    } as const;
  } catch (_e) {
    return { success: false } as const;
  }
};
