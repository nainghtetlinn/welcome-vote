import { z } from 'zod'

export const candidateSchema = z.object({
  name: z.string(),
  roll_no: z.string(),
  bio: z.string().optional(),
  photo_url: z.string(),
})

export type TCandidate = z.infer<typeof candidateSchema>
