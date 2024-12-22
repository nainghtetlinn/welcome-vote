'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'

import { useState } from 'react'

import { logout } from '../action'

const Header = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
  }

  return (
    <header className='flex justify-between items-center p-4 border-b'>
      <div className='flex items-center gap-2'>
        <h5 className='text-primary font-bold text-lg'>IT Welcome Voter</h5>
        <Badge>Admin</Badge>
      </div>
      <div>
        <Button
          variant='secondary'
          size='sm'
          disabled={loading}
          onClick={handleClick}
        >
          Logout {loading ? <Loader2 className='animate-spin' /> : <LogOut />}
        </Button>
      </div>
    </header>
  )
}

export default Header
