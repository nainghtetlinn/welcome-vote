'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { candidateSchema, TCandidate } from '@/types/candidate'
import { ErrorResponse } from '@/types/error'
import { createError } from '@/utils/error'
import { createClient } from '@/utils/supabase/server'

export const createNewCandidate = async (
  e: TCandidate & { event_id: string }
): Promise<ErrorResponse> => {
  const { success, data } = candidateSchema.safeParse(e)

  if (!success) return { success: false, message: 'Invalid inputs' }

  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .select('id, name')
    .eq('id', e.event_id)
    .single()

  if (eventResult.error) return createError(eventResult.error)

  const candidateResult = await supabase
    .from('candidates')
    .insert({
      event_id: eventResult.data.id,
      name: data.name,
      roll_no: data.roll_no,
      bio: data.bio,
      gender: data.gender,
    })
    .select('id')
    .single()

  if (candidateResult.error) return createError(candidateResult.error)

  const photoResult = await supabase.storage
    .from('profile_pictures')
    .upload(
      `${eventResult.data.name}/${candidateResult.data.id}_${data.photo.name}`,
      data.photo
    )

  if (photoResult.error) return createError(photoResult.error)

  const urlResult = supabase.storage
    .from('profile_pictures')
    .getPublicUrl(photoResult.data.path)

  const updatedResult = await supabase
    .from('candidates')
    .update({
      photo_url: urlResult.data.publicUrl,
      photo_path: photoResult.data.path,
    })
    .eq('id', candidateResult.data.id)

  if (updatedResult.error) return createError(updatedResult.error)

  revalidatePath('/admin/:id')
  return { success: true, message: 'Successfully created new candidate' }
}

export const deleteCandidate = async (id: string): Promise<ErrorResponse> => {
  const supabase = await createClient()

  const candidateResult = await supabase
    .from('candidates')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (candidateResult.error) return createError(candidateResult.error)

  if (candidateResult.data.photo_path) {
    const photoResult = await supabase.storage
      .from('profile_pictures')
      .remove([candidateResult.data.photo_path])

    if (photoResult.error) return createError(photoResult.error)
  }

  revalidatePath('/admin/:id')
  return { success: true, message: 'Successfully deleted candidate' }
}

export const toggleActive = async ({
  status,
  id,
}: {
  status: boolean
  id: string
}): Promise<ErrorResponse> => {
  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .update({ active: !status })
    .eq('id', id)
    .select()

  if (eventResult.error) return createError(eventResult.error)

  revalidatePath('/admin/:id')
  return { success: true, message: 'Successfully toggled active status' }
}

export const deleteEvent = async (id: string): Promise<ErrorResponse> => {
  const supabase = await createClient()

  const eventResult = await supabase.from('events').delete().eq('id', id)

  if (eventResult.error) return createError(eventResult.error)

  revalidatePath('/admin')
  redirect('/admin')
}
