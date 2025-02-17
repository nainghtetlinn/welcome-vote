'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { ErrorResponse } from '@/types/error'
import { loginSchema, TLogin } from '@/types/login'
import { createClient } from '@/utils/supabase/server'
import { createError } from '@/utils/error'

export async function login(e: TLogin): Promise<ErrorResponse> {
  const supabase = await createClient()

  const { success, data } = loginSchema.safeParse(e)

  if (!success) return { success: false, message: 'Invalid credentials' }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) return createError(error)

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
