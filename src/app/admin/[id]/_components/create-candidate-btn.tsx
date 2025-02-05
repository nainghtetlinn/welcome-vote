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
import { Loader2, Plus } from 'lucide-react'

import CandidateForm from '@/components/form/candidate-form'
import { candidateSchema, TCandidate } from '@/types/candidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createNewCandidate } from '../action'

const CreateCandidateBtn = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams<{ id: string }>()

  const form = useForm<TCandidate>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: '',
      roll_no: '',
      bio: '',
      gender: 'male',
      photo: undefined,
    },
  })

  const ref = useRef<{ clearPreview: () => void }>(null)

  const onSubmit = async (data: TCandidate) => {
    setLoading(true)
    try {
      await createNewCandidate({ ...data, event_id: params.id })
      toast.success('Success')
      setOpen(false)
      ref.current?.clearPreview()
      form.reset()
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
        <Button
          size='icon'
          className='w-10 h-10 rounded-full'
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Candidate</DialogTitle>
          <DialogDescription>
            Click save to create new candidate.
          </DialogDescription>
        </DialogHeader>

        <CandidateForm
          ref={ref}
          form={form}
        />

        <DialogFooter>
          <Button
            variant='secondary'
            onClick={() => {
              form.reset()
              ref.current?.clearPreview()
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCandidateBtn
