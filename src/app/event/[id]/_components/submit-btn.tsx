'use client'

import { Button } from '@/components/ui/button'
import { SendHorizonal, Loader2 } from 'lucide-react'

import { toast } from 'sonner'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useVoteContext } from '@/providers/vote-provider'
import { submitVote } from '../action'

const SubmitBtn = () => {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const { votes } = useVoteContext()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitVote(
        {
          king: votes.king?.id,
          queen: votes.queen?.id,
          prince: votes.prince?.id,
          princess: votes.princess?.id,
        },
        params.id
      )
      toast.success('Success')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? <Loader2 className='animate-spin' /> : <SendHorizonal />}{' '}
      Submit
    </Button>
  )
}

export default SubmitBtn
