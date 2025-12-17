"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createError } from "@/lib/utils";
import { ErrorResponse } from "@/types/error";

export const toggleActive = async ({
  status,
  id,
}: {
  status: boolean;
  id: string;
}): Promise<ErrorResponse> => {
  const supabase = await createClient();

  const eventResult = await supabase
    .from("events")
    .update({ active: !status })
    .eq("id", id)
    .select();

  if (eventResult.error) return createError(eventResult.error);

  revalidatePath("/admin/:id");
  return { success: true, message: "Successfully toggled active status" };
};
