"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useVoteContext } from "@/providers/vote-provider";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useState } from "react";

const VoteBtn = ({ candidate }: { candidate: Tables<"candidates"> }) => {
  const { votes, updateVote } = useVoteContext();

  const [open, setOpen] = useState(false);

  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  const [firstShouldUnselect, setFirstShouldUnselect] = useState(false);
  const [secondShouldUnselect, setSecondShouldUnselect] = useState(false);

  const firstSlotCandidate =
    candidate.gender === "male" ? votes.king : votes.queen;
  const secondSlotCandidate =
    candidate.gender === "male" ? votes.prince : votes.princess;

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleConfirm = () => {
    if (firstCheck) {
      updateVote(candidate.gender === "male" ? "king" : "queen", candidate);
    } else {
      if (firstShouldUnselect) {
        updateVote(candidate.gender === "male" ? "king" : "queen", null);
      }
    }

    if (secondCheck) {
      updateVote(
        candidate.gender === "male" ? "prince" : "princess",
        candidate
      );
    } else {
      if (secondShouldUnselect) {
        updateVote(candidate.gender === "male" ? "prince" : "princess", null);
      }
    }

    setOpen(false);
    setFirstCheck(false);
    setSecondCheck(false);
    setFirstShouldUnselect(false);
    setSecondShouldUnselect(false);
    setTimeout(goToTop, 500);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          if (state) {
            if (
              !!firstSlotCandidate &&
              firstSlotCandidate.id === candidate.id
            ) {
              setFirstCheck(true);
              setFirstShouldUnselect(true);
            }
            if (
              !!secondSlotCandidate &&
              secondSlotCandidate.id === candidate.id
            ) {
              setSecondCheck(true);
              setSecondShouldUnselect(true);
            }
          } else {
            setFirstCheck(false);
            setSecondCheck(false);
            setFirstShouldUnselect(false);
            setSecondShouldUnselect(false);
          }
          setOpen(state);
        }}
      >
        <DialogTrigger asChild>
          <Button className="w-full">Vote</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vote</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 border-dashed border-2 rounded-lg border-primary p-2">
            <p className="text-center text-sm">My Votes</p>
            <div className="flex items-start justify-between gap-2">
              {firstCheck ? (
                <VotedCandidateInfo candidate={candidate} />
              ) : firstShouldUnselect ? (
                <VotedCandidateInfo candidate={null} />
              ) : candidate.gender === "male" && votes.king ? (
                <VotedCandidateInfo candidate={votes.king} />
              ) : candidate.gender === "female" && votes.queen ? (
                <VotedCandidateInfo candidate={votes.queen} />
              ) : (
                <VotedCandidateInfo candidate={null} />
              )}
              <Badge>{candidate.gender === "male" ? "King" : "Queen"}</Badge>
            </div>
            <div className="flex items-start justify-between gap-2">
              {secondCheck ? (
                <VotedCandidateInfo candidate={candidate} />
              ) : secondShouldUnselect ? (
                <VotedCandidateInfo candidate={null} />
              ) : candidate.gender === "male" && votes.prince ? (
                <VotedCandidateInfo candidate={votes.prince} />
              ) : candidate.gender === "female" && votes.princess ? (
                <VotedCandidateInfo candidate={votes.princess} />
              ) : (
                <VotedCandidateInfo candidate={null} />
              )}
              <Badge variant={"outline"}>
                {candidate.gender === "male" ? "Prince" : "Princess"}
              </Badge>
            </div>
          </div>

          <div className="border rounded-lg p-2">
            <div className="mb-2 flex flex-col items-center">
              <div className="w-1/2 relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={candidate.photo_url || "/profile.png"}
                  alt={candidate.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold">{candidate.name}</p>
              <p className="text-muted-foreground text-sm">
                {candidate.roll_no}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                asChild
                variant={"outline"}
              >
                <Label htmlFor="first">
                  <Checkbox
                    id="first"
                    checked={firstCheck}
                    onCheckedChange={(checked) => {
                      setFirstCheck(!!checked);
                    }}
                  />
                  <span>{candidate.gender === "male" ? "King" : "Queen"}</span>
                </Label>
              </Button>
              <Button
                asChild
                variant={"outline"}
              >
                <Label htmlFor="second">
                  <Checkbox
                    id="second"
                    checked={secondCheck}
                    onCheckedChange={(checked) => {
                      setSecondCheck(!!checked);
                    }}
                  />
                  <span>
                    {candidate.gender === "male" ? "Prince" : "Princess"}
                  </span>
                </Label>
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant={"secondary"}
              onClick={() => {
                setOpen(false);
                setFirstCheck(false);
                setSecondCheck(false);
                setFirstShouldUnselect(false);
                setSecondShouldUnselect(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const VotedCandidateInfo = ({
  candidate,
}: {
  candidate: Tables<"candidates"> | null;
}) => {
  return (
    <div className="flex gap-2">
      <Avatar className="size-12">
        <AvatarImage src={candidate?.photo_url || "/profile.png"} />
      </Avatar>
      <div>
        <h6 className="font-semibold">{candidate?.name}</h6>
        <p className="text-sm text-muted-foreground">{candidate?.roll_no}</p>
      </div>
    </div>
  );
};

export default VoteBtn;
