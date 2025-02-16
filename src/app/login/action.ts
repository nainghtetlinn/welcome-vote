'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { loginSchema, TLogin } from '@/types/login'

export async function login(e: TLogin) {
  const supabase = await createClient()

  const { success, data } = loginSchema.safeParse(e)

  if (!success) redirect('/error')

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) redirect('/error')

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}
