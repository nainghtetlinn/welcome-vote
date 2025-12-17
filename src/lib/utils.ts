import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ErrorResponse } from "@/types/error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createError(error: unknown, message?: string): ErrorResponse {
  console.log("Supabase error:", error);
  return {
    success: false,
    message: message || "Something went wrong",
  };
}
