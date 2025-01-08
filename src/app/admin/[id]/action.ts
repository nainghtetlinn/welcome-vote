'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'
import { candidateSchema, TCandidate } from '@/types/candidate'

export async function createNewCandidate(e: TCandidate & { event_id: string }) {
  const { success, data } = candidateSchema.safeParse(e)

  if (!success) throw new Error('Invalid inputs.')

  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .select('id, name')
    .eq('id', e.event_id)
    .single()

  if (eventResult.error) throw new Error(eventResult.error.message)

  const candidateResult = await supabase
    .from('candidates')
    .insert({
      event_id: eventResult.data.id,
      name: data.name,
      roll_no: data.roll_no,
      bio: data.bio,
      gender: data.gender,
    })
    .select('id, roll_no, name')
    .single()

  if (candidateResult.error) throw new Error(candidateResult.error.message)

  const photoResult = await supabase.storage
    .from('profile_pictures')
    .upload(
      `${eventResult.data.name}/${candidateResult.data.roll_no}_${candidateResult.data.name}`,
      data.photo
    )

  if (photoResult.error) throw new Error(photoResult.error.message)

  const urlResult = await supabase.storage
    .from('profile_pictures')
    .getPublicUrl(photoResult.data.path)

  await supabase
    .from('candidates')
    .update({ photo_url: urlResult.data.publicUrl })
    .eq('id', candidateResult.data.id)

  revalidatePath('/admin/:id')
}

export const toggleActive = async ({
  status,
  id,
}: {
  status: boolean
  id: string
}) => {
  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .update({ active: !status })
    .eq('id', id)
    .select()

  if (eventResult.error) throw new Error(eventResult.error.message)

  revalidatePath('/admin/:id')
}
