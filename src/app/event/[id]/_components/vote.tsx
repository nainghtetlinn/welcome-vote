"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import CandidatesCarousel from "./candidates-carousel";

import { useVoteContext } from "@/providers/vote-provider";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useState } from "react";

const Vote = ({
  category,
  candidates,
}: {
  category: "king" | "prince" | "queen" | "princess";
  candidates: Tables<"candidates">[];
}) => {
  const { votes, updateVote } = useVoteContext();

  const candidate = votes[category];

  const [open, setOpen] = useState(false);

  const handleVote = (c: Tables<"candidates">) => {
    updateVote(category, c);
    setOpen(false);
  };

  const handleRemove = () => {
    updateVote(category, null);
  };

  if (!candidate)
    return (
      <div className="aspect-square mx-auto max-w-90 border rounded-xl bg-card p-6 hover:opacity-90">
        <Dialog
          open={open}
          onOpenChange={(state) => {
            setOpen(state);
          }}
        >
          <DialogTrigger asChild>
            <div className="w-full h-full cursor-pointer border-dashed rounded-lg border-primary border-2 flex items-center justify-center">
              <p>
                Click to vote for{" "}
                <span className="uppercase underline font-semibold">
                  {category}
                </span>
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="px-0">
            <DialogHeader>
              <DialogTitle className="uppercase text-center">
                {category}
              </DialogTitle>
            </DialogHeader>
            <CandidatesCarousel
              candidates={candidates}
              handleVote={handleVote}
            />
          </DialogContent>
        </Dialog>
      </div>
    );

  return (
    <div className="relative aspect-square mx-auto max-w-90 border rounded-xl bg-card overflow-hidden">
      {/* Candidate image */}
      <div className="absolute inset-0">
        <Image
          src={candidate.photo_url || "/profile.png"}
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
          <div className="flex-1">
            <h5 className="font-semibold text-sm mb-2 capitalize">
              {category}
            </h5>
            <h6 className="font-bold text-lg">{candidate.name}</h6>
            <p className="text-sm">{candidate.roll_no}</p>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shrink-0 w-6 h-6 bg-secondary text-secondary-foreground"
            onClick={handleRemove}
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
