"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createError } from "@/lib/utils";
import { candidateSchema, TCandidate } from "@/schemas/candidate";
import { ErrorResponse } from "@/types/error";

export const createCandidate = async (
  e: TCandidate & { event_name: string }
): Promise<ErrorResponse> => {
  const { success, data } = candidateSchema.safeParse(e);

  if (!success) return { success: false, message: "Invalid inputs" };

  const supabase = await createClient();

  const eventResult = await supabase
    .from("events")
    .select("id, name")
    .eq("name", e.event_name)
    .single();

  if (eventResult.error) return createError(eventResult.error);

  const candidateResult = await supabase
    .from("candidates")
    .insert({
      event_id: eventResult.data.id,
      name: data.name,
      roll_no: data.roll_no,
      gender: data.gender,
    })
    .select("id")
    .single();

  if (candidateResult.error) return createError(candidateResult.error);
  const photoResult = await supabase.storage
    .from("profile_pictures")
    .upload(
      `${eventResult.data.name}/${data.name}_${candidateResult.data.id}_${data.photo.name}`,
      data.photo
    );

  if (photoResult.error) {
    await supabase
      .from("candidates")
      .delete()
      .eq("id", candidateResult.data.id);
    return createError(photoResult.error);
  }

  const urlResult = supabase.storage
    .from("profile_pictures")
    .getPublicUrl(photoResult.data.path);

  const updatedResult = await supabase
    .from("candidates")
    .update({
      photo_url: urlResult.data.publicUrl,
      photo_path: photoResult.data.path,
    })
    .eq("id", candidateResult.data.id);

  if (updatedResult.error) return createError(updatedResult.error);

  revalidatePath("/admin/:id");
  return { success: true, message: "Successfully created new candidate" };
};
