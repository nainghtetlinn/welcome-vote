'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { TEvent } from '@/types/event'

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function createNewEvent(data: TEvent) {
  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .insert({ name: data.name, duration_in_min: 120 })

  if (eventResult.error) throw new Error(eventResult.error.message)

  revalidatePath('/admin')
}
