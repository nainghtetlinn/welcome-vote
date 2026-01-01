"use client";

import { createContext, useContext, useState } from "react";
import { Tables } from "@/types/supabase";

type TCandidate = Tables<"candidates">;

type TVote = {
  king: null | TCandidate;
  queen: null | TCandidate;
  prince: null | TCandidate;
  princess: null | TCandidate;
};

export type TCategories = keyof TVote;

const voteContext = createContext<{
  votes: TVote;
  updateVote: (category: keyof TVote, value: TCandidate | null) => void;
  lastVotedCategory?: keyof TVote;
}>({
  votes: { king: null, queen: null, prince: null, princess: null },
  updateVote: () => {},
});

const VoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [myVote, setMyVote] = useState<TVote>({
    king: null,
    queen: null,
    prince: null,
    princess: null,
  });
  const [lastVotedCategory, setLastVotedCategory] = useState<keyof TVote>();

  const updateVote = (category: keyof TVote, value: TCandidate | null) => {
    setMyVote((prev) => ({ ...prev, [category]: value }));
    setLastVotedCategory(category);
  };

  return (
    <voteContext.Provider
      value={{ votes: myVote, updateVote, lastVotedCategory }}
    >
      {children}
    </voteContext.Provider>
  );
};

export default VoteProvider;

export const useVoteContext = () => useContext(voteContext);
