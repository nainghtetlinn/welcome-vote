"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createError } from "@/lib/utils";
import { ErrorResponse } from "@/types/error";

export const deleteCandidate = async (id: string): Promise<ErrorResponse> => {
  const supabase = await createClient();

  const candidateResult = await supabase
    .from("candidates")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (candidateResult.error) return createError(candidateResult.error);

  if (candidateResult.data.photo_path) {
    const photoResult = await supabase.storage
      .from("profile_pictures")
      .remove([candidateResult.data.photo_path]);

    if (photoResult.error) return createError(photoResult.error);
  }

  revalidatePath("/admin/:id");
  return { success: true, message: "Successfully deleted candidate" };
};
