import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PostgrestError } from "@supabase/supabase-js";

import { ErrorResponse } from "@/types/error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createError(
  error: PostgrestError,
  message?: string
): ErrorResponse {
  console.log("Supabase error:", error);
  return {
    success: false,
    message: message || error.message || "Something went wrong",
  };
}
