'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, Trash } from 'lucide-react'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteEvent } from '../action'

const DeleteEventBtn = () => {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const result = await deleteEvent(params.id)
    if (result.error) {
      console.log('Error', result.error)
      toast.error('Something went wrong')
    } else {
      toast.success('Success')
    }
    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='icon'
          variant='destructive'
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>Click confirm to delete event.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='secondary'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            disabled={loading}
            onClick={handleClick}
          >
            Confirm {loading && <Loader2 className='animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEventBtn
