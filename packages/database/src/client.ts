"use client";

import { env } from "@repo/env";
import { createBrowserClient } from "@supabase/ssr";

export const createBrowserSupabaseClient = () =>
  createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
