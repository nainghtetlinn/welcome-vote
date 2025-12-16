"use server";

import { revalidatePath } from "next/cache";

import { TEvent } from "@/schemas/event";
import { createError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { ErrorResponse } from "@/types/error";

export async function createEvent(data: TEvent): Promise<ErrorResponse> {
  const supabase = await createClient();

  const eventResult = await supabase.from("events").insert({ name: data.name });

  if (eventResult.error) return createError(eventResult.error);

  revalidatePath("/admin");
  return { success: true, message: "Successfully created new event" };
}
