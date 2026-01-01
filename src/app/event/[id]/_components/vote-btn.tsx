"use client";

import { Button } from "@/components/ui/button";

import { useVoteContext } from "@/providers/vote-provider";
import { Tables } from "@/types/supabase";

const VoteBtn = ({
  candidate,
  category,
}: {
  candidate: Tables<"candidates">;
  category: "king" | "queen" | "prince" | "princess";
}) => {
  const { votes, updateVote } = useVoteContext();

  const isVoted = votes[category] && votes[category].id == candidate.id;

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    updateVote(category, candidate);
    goToTop();
  };

  const handleCancel = () => {
    updateVote(category, null);
  };

  return (
    <>
      <div className="w-full">
        {isVoted ? (
          <Button
            variant="secondary"
            className="w-full capitalize"
            onClick={handleCancel}
          >
            Cancel ({category})
          </Button>
        ) : votes[category] ? (
          <Button
            className="w-full capitalize"
            onClick={handleClick}
          >
            Change ({category})
          </Button>
        ) : (
          <Button
            className="w-full capitalize"
            onClick={handleClick}
          >
            Vote ({category})
          </Button>
        )}
      </div>
    </>
  );
};

export default VoteBtn;
