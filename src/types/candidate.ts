import { z } from 'zod'

export const candidateSchema = z.object({
  name: z.string().min(1, 'Name required.'),
  roll_no: z.coerce
    .number()
    .min(1, 'Roll no. must be greater than or equal to 1'),
  gender: z.enum(['male', 'female']),
  bio: z.string().optional(),
  photo: z.instanceof(File),
})

export type TCandidate = z.infer<typeof candidateSchema>
