'use client'

import ProfileImage from '@/assets/profile.png'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X } from 'lucide-react'

import { useVoteContext } from '@/providers/vote-provider'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Tables } from '@/types/supabase'

const MyVotes = () => {
  const containerRef = useRef(null)
  const { votes } = useVoteContext()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['0.6 start', 'end start'],
  })

  const dropPosition = useTransform(scrollYProgress, [0, 1], [-100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div>
      {/* Mini votes list */}
      <motion.div
        style={{
          top: dropPosition,
          opacity,
          transition: 'opacity 0.3s ease, top 0.3s ease',
        }}
        className='fixed left-0 right-0 z-50 p-4 bg-card text-card-foreground shadow-md'
      >
        <div className='flex justify-center gap-4'>
          <h3 className='font-bold text-xl'>
            Your <span className='text-primary text-2xl underline'>Votes</span>
          </h3>
          <MyVoteMini
            title='King'
            candidate={votes.king}
          />
          <MyVoteMini
            title='Queen'
            candidate={votes.queen}
          />
          <MyVoteMini
            title='Prince'
            candidate={votes.prince}
          />
          <MyVoteMini
            title='Princess'
            candidate={votes.princess}
          />
        </div>
      </motion.div>

      {/* Bigger votes list */}
      <div
        ref={containerRef}
        className='grid grid-cols-2 sm:grid-cols-4 gap-2'
      >
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
    </div>
  )
}

const MyVoteMini = ({
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
      <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border'>
        <Image
          src={ProfileImage}
          alt={title}
          width={40}
          height={40}
          className='w-full h-full object-cover'
        />
      </div>
    )

  return (
    <div className='relative'>
      <Button
        variant='destructive'
        size='icon'
        className='absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full'
        onClick={handleClick}
      >
        <X />
      </Button>
      {candidate.photo_url ? (
        <Avatar>
          <AvatarImage
            src={candidate.photo_url}
            className='object-cover'
          />
          <AvatarFallback>{candidate.name[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border'>
          <Image
            src={ProfileImage}
            alt={title}
            width={40}
            height={40}
            className='w-full h-full object-cover'
          />
        </div>
      )}
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
            <AvatarImage
              src={candidate.photo_url}
              className='object-cover'
            />
            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <Image
              src={ProfileImage}
              alt={title}
              width={40}
              height={40}
              className='w-full h-full object-cover'
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
