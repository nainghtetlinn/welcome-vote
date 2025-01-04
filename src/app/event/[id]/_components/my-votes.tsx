'use client'

import ProfileImage from '@/assets/profile.png'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X } from 'lucide-react'

import { useVoteContext } from '@/providers/vote-provider'
import { Tables } from '@/types/supabase'

const MyVotes = () => {
  const { votes } = useVoteContext()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
      <MyVote
        title='King'
        candidate={votes.king}
      />
      <MyVote
        title='Queen'
        candidate={votes.queen}
      />
      <MyVote
        title='Prince'
        candidate={votes.prince}
      />
      <MyVote
        title='Princess'
        candidate={votes.princess}
      />
    </div>
  )
}

const MyVote = ({
  title,
  candidate,
}: {
  title: string
  candidate: Tables<'candidates'> | null
}) => {
  const { updateVote } = useVoteContext()

  const handleClick = () => {
    updateVote(title.toLowerCase(), null)
  }

  if (!candidate)
    return (
      <Card className='h-[150px] flex flex-col items-center justify-center'>
        <h5 className='font-bold'>{title}</h5>
      </Card>
    )

  return (
    <Card className='h-[150px] flex flex-col p-2 bg-primary text-primary-foreground'>
      <div className='flex justify-between items-center'>
        <h5 className='font-bold text-sm'>{title}</h5>
        <Button
          size='icon'
          variant='secondary'
          className='rounded-full w-6 h-6'
          onClick={handleClick}
        >
          <X />
        </Button>
      </div>
      <div className='flex-1 flex items-center gap-2'>
        {candidate.photo_url ? (
          <Avatar>
            <AvatarImage src={candidate.photo_url} />
            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <Image
              src={ProfileImage}
              alt={title}
              width={40}
              height={40}
              className='w-full h-full'
            />
          </div>
        )}
        <div>
          <h6 className='font-bold'>{candidate.name}</h6>
          <p className='text-xs'>{candidate.roll_no}</p>
        </div>
      </div>
    </Card>
  )
}

export default MyVotes
