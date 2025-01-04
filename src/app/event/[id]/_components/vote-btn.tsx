'use client'

import { Vote } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useVoteContext } from '@/providers/vote-provider'
import { Tables } from '@/types/supabase'

const VoteBtn = ({
  candidate,
  category,
}: {
  candidate: Tables<'candidates'>
  category: string
}) => {
  const { votes, updateVote } = useVoteContext()

  //@ts-ignore
  const isVoted = votes[category] && votes[category].id == candidate.id

  const handleClick = () => {
    updateVote(category, candidate)
  }

  const handleCancel = () => {
    updateVote(category, null)
  }

  return (
    <>
      {isVoted ? (
        <Button
          variant='secondary'
          className='w-full'
          onClick={handleCancel}
        >
          Cancel
        </Button>
      ) : (
        <Button
          className='w-full'
          onClick={handleClick}
        >
          <Vote /> Vote
        </Button>
      )}
    </>
  )
}

export default VoteBtn
