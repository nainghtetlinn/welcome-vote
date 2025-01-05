'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { onlyUnique } from '@/utils/unique'

type TVote = {
  king?: string
  queen?: string
  prince?: string
  princess?: string
}

export const submitVote = async (data: TVote, eventId: string) => {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token || !eventId) throw new Error('Something went wrong')

  if (!data.king || !data.queen || !data.prince || !data.princess)
    throw new Error('All votes are required')

  const votes = [data.king, data.queen, data.prince, data.princess]

  const candidatesResult = await supabase
    .from('candidates')
    .select()
    .in('id', votes)
    .eq('event_id', eventId)

  if (candidatesResult.error) throw new Error('Something went wrong')

  if (candidatesResult.data.length !== votes.filter(onlyUnique).length)
    throw new Error('Invalid votes')

  const result = await supabase.from('votes').insert([
    {
      session_token: token,
      category_id: 1,
      candidate_id: data.king,
      event_id: eventId,
    },
    {
      session_token: token,
      category_id: 2,
      candidate_id: data.queen,
      event_id: eventId,
    },
    {
      session_token: token,
      category_id: 3,
      candidate_id: data.prince,
      event_id: eventId,
    },
    {
      session_token: token,
      category_id: 4,
      candidate_id: data.princess,
      event_id: eventId,
    },
  ])

  if (result.error) throw new Error('Something went wrong')
}
