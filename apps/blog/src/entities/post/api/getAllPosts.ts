import "server-only";
import { createServerSupabaseClient } from "@repo/database/server";
import type { CookieStore } from "~/shared/types/cookieStore";

export const getAllPosts = async (context?: { cookieStore?: CookieStore }) => {
  const supabase = await createServerSupabaseClient(context?.cookieStore);
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    throw error;
  }

  return data;
};
