"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { ErrorResponse } from "@/types/error";

export async function logout(): Promise<ErrorResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) return createError(error);

  revalidatePath("/", "layout");
  redirect("/");
}
