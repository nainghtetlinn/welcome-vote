'use client'

import FormInput from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Loader2, Plus } from 'lucide-react'

import { eventSchema, TEvent } from '@/types/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createNewEvent } from '../action'

const CreateEventCard = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TEvent>({
    resolver: zodResolver(eventSchema),
    defaultValues: { name: '' },
  })

  const onSubmit = async (data: TEvent) => {
    setLoading(true)

    const { success, message } = await createNewEvent(data)
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }

    setLoading(false)
  }

  return (
    <Card className='bg-primary text-primary-foreground'>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormInput
                label=''
                className='bg-secondary text-secondary-foreground'
                placeholder='20xx-20xx'
                {...field}
              />
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          variant='secondary'
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Create {loading ? <Loader2 className='animate-spin' /> : <Plus />}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CreateEventCard
