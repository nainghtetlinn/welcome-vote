'use client'

import { Button } from '@/components/ui/button'

import { useVoteContext } from '@/providers/vote-provider'
import { Tables } from '@/types/supabase'

const VoteBtn = ({
  candidate,
  category,
}: {
  candidate: Tables<'candidates'>
  category: 'king' | 'queen' | 'prince' | 'princess'
}) => {
  const { votes, updateVote } = useVoteContext()

  const isVoted = votes[category] && votes[category].id == candidate.id

  const handleClick = () => {
    updateVote(category, candidate)
  }

  const handleCancel = () => {
    updateVote(category, null)
  }

  return (
    <>
      <div className='flex-1'>
        {isVoted ? (
          <Button
            variant='secondary'
            className='w-full capitalize'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        ) : (
          <Button
            className='w-full capitalize'
            onClick={handleClick}
          >
            {category}
          </Button>
        )}
      </div>
    </>
  )
}

export default VoteBtn
