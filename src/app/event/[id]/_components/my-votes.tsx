"use client";

import ProfileImage from "@/assets/profile.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";

import { useVoteContext, TCategories } from "@/providers/vote-provider";
import { Tables } from "@/types/supabase";
import { cn } from "@/lib/utils";

const MyVotes = () => {
  const { votes } = useVoteContext();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MyVote
          category="queen"
          candidate={votes.queen}
        />
        <MyVote
          category="princess"
          candidate={votes.princess}
        />
        <MyVote
          category="king"
          candidate={votes.king}
        />
        <MyVote
          category="prince"
          candidate={votes.prince}
        />
      </div>
    </>
  );
};

const MyVote = ({
  category,
  candidate,
}: {
  category: TCategories;
  candidate: Tables<"candidates"> | null;
}) => {
  const { updateVote, lastVotedCategory } = useVoteContext();

  const handleClick = () => {
    updateVote(category, null);
  };

  if (!candidate)
    return (
      <Card className="aspect-square flex flex-col items-center justify-center">
        <h5 className="font-bold text-xl uppercase">{category}</h5>
      </Card>
    );

  return (
    <div
      className={cn(
        "aspect-square rounded-lg overflow-hidden relative border-2 border-transparent",
        {
          "border-red-500": lastVotedCategory === category,
        }
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={candidate.photo_url || ProfileImage}
          alt={candidate.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-3 text-white h-full flex flex-col justify-end">
        <div className="flex justify-between items-end">
          <div>
            <h5 className="font-semibold text-sm mb-2 capitalize">
              {category}
            </h5>
            <h6 className="font-bold text-lg">{candidate.name}</h6>
            <p className="text-sm">{candidate.roll_no}</p>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-6 h-6 bg-secondary text-secondary-foreground"
            onClick={handleClick}
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyVotes;
