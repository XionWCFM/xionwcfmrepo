"use server";

import { env } from "@repo/env";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import type { Database } from "./types_db";

export const createServerSupabaseClient = async (cookieStore: Awaited<ReturnType<typeof cookies>>, admin = false) => {
  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    admin ? env.NEXT_SUPABASE_SERVICE_ROLE! : env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (_error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (_error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export const createServerSupabaseAdminClient = async (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerSupabaseClient(cookieStore, true);
};
