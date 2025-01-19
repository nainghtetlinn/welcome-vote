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
import { Loader2 } from 'lucide-react'

import { useState } from 'react'
import { toast } from 'sonner'
import { deleteCandidate } from '../action'

const DeleteCandidateBtn = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await deleteCandidate(id)
      toast.success('Success')
    } catch (error) {
      console.log('Error', error)
      toast.error('Something went wrong')
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
        <Button variant='destructive'>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Candidate</DialogTitle>
          <DialogDescription>
            Click confirm to delete candidate.
          </DialogDescription>
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

export default DeleteCandidateBtn
