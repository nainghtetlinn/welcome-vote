'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, SendHorizonal } from 'lucide-react'
import QrCodeScanner from './qr-code-scanner'

import { useVoteContext } from '@/providers/vote-provider'
import { IDetectedBarcode } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import { toast } from 'sonner'
import { submitVote } from '../action'
import { useRouter } from 'next/navigation'

const SubmitBtn = ({ eventId }: { eventId: string }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { votes } = useVoteContext()

  const handleSubmit = async (data: IDetectedBarcode) => {
    setOpen(false)
    setLoading(true)
    try {
      await submitVote(
        {
          king: votes.king?.id,
          queen: votes.queen?.id,
          prince: votes.prince?.id,
          princess: votes.princess?.id,
        },
        eventId,
        data.rawValue
      )
      toast.success('Success')
      router.replace('/success')
    } catch (error: any) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={loading}>
          {loading ? <Loader2 className='animate-spin' /> : <SendHorizonal />}{' '}
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center'>
        <DialogHeader>
          <DialogTitle>Please scan your student ID card.</DialogTitle>
        </DialogHeader>

        <QrCodeScanner update={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default SubmitBtn
