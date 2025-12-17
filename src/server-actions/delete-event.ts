"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createError } from "@/lib/utils";
import { ErrorResponse } from "@/types/error";

export const deleteEvent = async (id: string): Promise<ErrorResponse> => {
  const supabase = await createClient();

  const eventResult = await supabase.from("events").delete().eq("name", id);

  if (eventResult.error) return createError(eventResult.error);

  revalidatePath("/admin");
  redirect("/admin");
};
