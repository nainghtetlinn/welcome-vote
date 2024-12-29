'use client'

import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

import { toggleActive } from '../action'
import { useState } from 'react'
import { toast } from 'sonner'

const Header = ({
  id,
  title,
  status,
}: {
  id: string
  title: string
  status: boolean
}) => {
  const [active, setActive] = useState(status)

  const handleClick = async () => {
    let a = active
    setActive(!active)
    try {
      await toggleActive({ id, status: active })
    } catch (error) {
      setActive(a)
      toast.error('Something went wrong')
    }
  }

  return (
    <header className='flex items-center justify-center gap-4 mb-8'>
      <h2 className='text-2xl font-bold underline'>{title}</h2>
      <Switch
        checked={active}
        onClick={handleClick}
      />
      {active ? (
        <Badge>Active</Badge>
      ) : (
        <Badge variant='secondary'>Inactive</Badge>
      )}
    </header>
  )
}

export default Header
