'use client'

import { createContext, useContext, useState } from 'react'
import { Tables } from '@/types/supabase'

type TCandidate = Tables<'candidates'>

type TVote = {
  king: null | TCandidate
  queen: null | TCandidate
  prince: null | TCandidate
  princess: null | TCandidate
}

const voteContext = createContext<{
  votes: TVote
  updateVote: (category: string, value: TCandidate | null) => void
}>({
  votes: { king: null, queen: null, prince: null, princess: null },
  updateVote: () => {},
})

const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [myVote, setMyVote] = useState<TVote>({
    king: null,
    queen: null,
    prince: null,
    princess: null,
  })

  const updateVote = (category: string, value: TCandidate | null) => {
    setMyVote(prev => ({ ...prev, [category]: value }))
  }

  return (
    <voteContext.Provider value={{ votes: myVote, updateVote }}>
      {children}
    </voteContext.Provider>
  )
}

export default VoteProvider

export const useVoteContext = () => useContext(voteContext)
