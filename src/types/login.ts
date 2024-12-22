import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Invalid password'),
})

export type TLogin = z.infer<typeof loginSchema>
