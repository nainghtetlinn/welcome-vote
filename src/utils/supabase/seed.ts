'use server'

import { createClient } from './server'

export default async function seed() {
  const supabase = await createClient()

  const eventResults = await supabase
    .from('events')
    .insert([
      { name: '2022-2023', duration_in_min: 120 },
      { name: '2023-2024', duration_in_min: 120 },
      { name: '2024-2025', duration_in_min: 120 },
    ])
    .select('id')

  eventResults.data?.map(async event => {
    await supabase.from('candidates').insert([
      { name: 'Naing', roll_no: 1, gender: 'male', event_id: event.id },
      { name: 'Khaing', roll_no: 2, gender: 'female', event_id: event.id },
      { name: 'Eaindray', roll_no: 3, gender: 'female', event_id: event.id },
      { name: 'Hlan', roll_no: 4, gender: 'male', event_id: event.id },
      { name: 'Nyan', roll_no: 5, gender: 'male', event_id: event.id },
      { name: 'Su', roll_no: 6, gender: 'female', event_id: event.id },
      { name: 'Lyan', roll_no: 7, gender: 'male', event_id: event.id },
      { name: 'Kyal', roll_no: 8, gender: 'female', event_id: event.id },
      { name: 'Myint', roll_no: 9, gender: 'female', event_id: event.id },
      { name: 'Khant', roll_no: 10, gender: 'male', event_id: event.id },
      { name: 'Min', roll_no: 11, gender: 'male', event_id: event.id },
    ])
  })
}
