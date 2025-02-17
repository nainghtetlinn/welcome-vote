'use client'

import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'

import { Tables } from '@/types/supabase'
import { useState } from 'react'
import { toast } from 'sonner'
import { toggleActive } from '../action'
import DeleteEventBtn from './delete-event-btn'

const Header = ({ event }: { event: Tables<'events'> }) => {
  const [active, setActive] = useState(event.active)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    let a = active
    setActive(!active)
    setLoading(true)

    const { success, message } = await toggleActive({
      id: event.id,
      status: active,
    })
    if (success) {
      toast.success(message)
    } else {
      setActive(a)
      toast.error(message)
    }

    setLoading(false)
  }

  return (
    <header className='flex items-center justify-between mb-8'>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-bold underline text-primary'>
          {event.name}
        </h2>
        {loading ? (
          <Loader2 className='animate-spin text-primary' />
        ) : active ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant='secondary'>Inactive</Badge>
        )}
      </div>
      <div className='flex items-center gap-4'>
        <Switch
          checked={active}
          onClick={handleClick}
          disabled={loading}
        />
        <DeleteEventBtn />
      </div>
    </header>
  )
}

export default Header
