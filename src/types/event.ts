import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(1, 'Name required.'),
})

export type TEvent = z.infer<typeof eventSchema>
