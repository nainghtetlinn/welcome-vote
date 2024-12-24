import Event from './_components/event-card'
import Create from './_components/create-event-card'

import { createClient } from '@/utils/supabase/server'

const Admin = async () => {
  const supabase = await createClient()

  const events = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className='p-4 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <Create />
      {events.data?.map(event => (
        <Event
          key={event.id}
          event={event}
        />
      ))}
    </div>
  )
}

export default Admin
