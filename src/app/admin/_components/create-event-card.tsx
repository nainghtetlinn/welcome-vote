'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus } from 'lucide-react'

import { useState } from 'react'

const CreateEvent = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Card className='bg-primary text-primary-foreground'>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className='bg-secondary text-secondary-foreground'
          placeholder='20xx-20xx'
        />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button
          variant='secondary'
          disabled={loading}
        >
          Create {loading ? <Loader2 className='animate-spin' /> : <Plus />}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CreateEvent
