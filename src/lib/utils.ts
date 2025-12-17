import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ErrorResponse } from "@/types/error";
import { Tables } from "@/types/supabase";

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

export function isValidQRCode(input: string): boolean {
  const regex =
    /^TUTGI - [A-Za-z\s]+\|\s*[1-6](IT|CIVIL|EC|EP|MP|MN)\s*-\s*\d+$/;
  return regex.test(input);
}

export function extractDetails(input: string): {
  name: string;
  roll_no: string;
} {
  const regex =
    /^TUTGI - ([A-Za-z\s]+)\|\s*([1-6](IT|CIVIL|EC|EP|MP|MN)\s*-\s*\d+)$/;
  const match = input.match(regex);

  if (match) {
    return {
      name: match[1].trim(),
      roll_no: match[2].trim(),
    };
  }
  return { name: "", roll_no: "" };
}

export function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}

type TCandidates = Tables<"candidates">[];

export const filterCandidates = (
  candidates: TCandidates
): { males: TCandidates; females: TCandidates } => {
  const males: TCandidates = [];
  const females: TCandidates = [];

  candidates.forEach((c) => {
    if (c.gender == "male") males.push(c);
    else females.push(c);
  });

  return { males, females };
};
