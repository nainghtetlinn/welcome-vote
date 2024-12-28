'use client'

import seed from '@/utils/supabase/seed'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'

const SeedBtn = () => {
  const [isPending, startTransition] = useTransition()

  const handleSeed = () => {
    startTransition(async () => {
      await seed()
    })
  }

  return (
    <Button
      onClick={handleSeed}
      disabled={isPending}
    >
      {isPending && <Loader2 className='animate-spin' />}
      Click to seed
    </Button>
  )
}

export default SeedBtn
