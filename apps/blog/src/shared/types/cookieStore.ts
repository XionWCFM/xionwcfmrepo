import type { cookies } from "next/headers";

export type CookieStore = Awaited<ReturnType<typeof cookies>>;
