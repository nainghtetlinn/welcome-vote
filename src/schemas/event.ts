import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Event name required."),
});

export type TEvent = z.infer<typeof eventSchema>;
