import { z } from "zod";

export const candidateSchema = z.object({
  name: z.string().min(1, "Name required."),
  roll_no: z.string().min(1, "Roll no. required."),
  gender: z.enum(["male", "female"]),
  bio: z.string().optional(),
  photo: z.instanceof(File),
});

export type TCandidate = z.infer<typeof candidateSchema>;
