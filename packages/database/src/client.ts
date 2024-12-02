"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createBrowserSupabaseClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
