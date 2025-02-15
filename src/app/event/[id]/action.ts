'use server'

import { createError } from '@/utils/error'
import { extractDetails, isValidQRCode } from '@/utils/qrcode'
import { createClient } from '@/utils/supabase/server'
import { onlyUnique } from '@/utils/unique'
import { redirect } from 'next/navigation'

type TVote = {
  king?: string
  queen?: string
  prince?: string
  princess?: string
}

export const submitVote = async (
  data: TVote,
  eventId: string,
  qr: string
): Promise<{ success: boolean; message?: string; error?: any }> => {
  const supabase = await createClient()

  /**
    check if student id card is valid
   */
  if (!isValidQRCode(qr)) return { success: false, message: 'Invalid ID card' }
  /********************************/

  const { name, roll_no } = extractDetails(qr)

  /**
    check if voter already exists
    if not create new one
   */
  let voterResult = await supabase.from('voters').select().eq('raw_data', qr)
  if (voterResult.error) return createError(voterResult.error)

  if (!voterResult.data[0])
    voterResult = await supabase
      .from('voters')
      .insert({ raw_data: qr, name, roll_no })
      .select()
  if (voterResult.error) return createError(voterResult.error)
  /********************************/

  /**
    check if already voted
   */
  const myVotesResult = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('voter_id', voterResult.data[0].id)
  if (myVotesResult.error) return createError(myVotesResult.error)
  if (myVotesResult.count && myVotesResult.count > 0)
    return {
      success: false,
      message: 'You already voted',
    }
  /********************************/

  /**
    check if all votes are valid
   */
  if (!data.king || !data.queen || !data.prince || !data.princess)
    return {
      success: false,
      message: 'All votes are required',
    }

  const votes = [data.king, data.queen, data.prince, data.princess]

  const candidatesResult = await supabase
    .from('candidates')
    .select()
    .in('id', votes)
    .eq('event_id', eventId)
  if (candidatesResult.error) return createError(candidatesResult.error)
  if (candidatesResult.data.length !== votes.filter(onlyUnique).length)
    return {
      success: false,
      message: 'Invalid votes',
    }
  /********************************/

  /**
    create votes
   */
  const result = await supabase.from('votes').insert([
    {
      category_id: 1,
      candidate_id: data.king,
      event_id: eventId,
      voter_id: voterResult.data[0].id,
    },
    {
      category_id: 2,
      candidate_id: data.queen,
      event_id: eventId,
      voter_id: voterResult.data[0].id,
    },
    {
      category_id: 3,
      candidate_id: data.prince,
      event_id: eventId,
      voter_id: voterResult.data[0].id,
    },
    {
      category_id: 4,
      candidate_id: data.princess,
      event_id: eventId,
      voter_id: voterResult.data[0].id,
    },
  ])
  if (result.error) return createError(result.error)
  /********************************/

  redirect('/success')
}
