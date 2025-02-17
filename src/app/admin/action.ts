'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { TEvent } from '@/types/event'
import { createError } from '@/utils/error'
import { createClient } from '@/utils/supabase/server'
import { ErrorResponse } from '@/types/error'

export async function logout(): Promise<ErrorResponse> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) return createError(error)

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function createNewEvent(data: TEvent): Promise<ErrorResponse> {
  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .insert({ name: data.name, duration_in_min: 120 })

  if (eventResult.error) return createError(eventResult.error)

  revalidatePath('/admin')
  return { success: true, message: 'Successfully created new event' }
}
