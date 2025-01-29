import "server-only";
import { createServerSupabaseClient } from "@repo/database/server";
import type { cookies } from "next/headers";

export const getAllPosts = async (cookieStore?: Awaited<ReturnType<typeof cookies>>) => {
  const supabase = await createServerSupabaseClient(cookieStore);
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    throw error;
  }

  return data;
};
