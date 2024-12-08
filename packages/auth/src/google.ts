import { env } from "@repo/env";
import { Google } from "arctic";

export const google = new Google(
  env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "https://localhost:3000/api/login/google/callback",
);

export interface GoogleClaim {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash?: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
}
