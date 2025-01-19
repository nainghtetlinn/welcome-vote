'use client'

import ProfileImage from '@/assets/profile.png'
import FormInput from '@/components/form-input'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2, Plus } from 'lucide-react'

import { candidateSchema, TCandidate } from '@/types/candidate'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createNewCandidate } from '../action'

const CreateCandidateBtn = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>()

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

  const onSubmit = async (data: TCandidate) => {
    setLoading(true)
    try {
      await createNewCandidate({ ...data, event_id: params.id })
      toast.success('Success')
      setOpen(false)
      setPreview(undefined)
      form.reset()
    } catch (error) {
      console.log('Error', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const uploadImageToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
      form.setValue('photo', file)
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

        <Form {...form}>
          <FormItem>
            <FormLabel>Photo</FormLabel>
            <FormControl>
              <Label
                htmlFor='photo'
                className='cursor-pointer'
              >
                <div className='border rounded-full overflow-hidden w-[100px] h-[100px]'>
                  <Image
                    src={preview ?? ProfileImage}
                    alt='Profile'
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                  />
                </div>
                <Input
                  id='photo'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={uploadImageToClient}
                />
              </Label>
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormInput
                label='Name'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='roll_no'
            render={({ field }) => (
              <FormInput
                label='Roll No.'
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='male'
                        id='m'
                      />
                      <Label htmlFor='m'>Male</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='female'
                        id='f'
                      />
                      <Label htmlFor='f'>Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormInput
                label='Bio (optional)'
                {...field}
              />
            )}
          />
        </Form>

        <DialogFooter>
          <Button
            variant='secondary'
            onClick={() => {
              form.reset()
              setPreview(undefined)
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
