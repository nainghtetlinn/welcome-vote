"use client";

import ProfileImage from "@/assets/profile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteCandidateBtn } from "./delete-candidate-btn";

import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useState } from "react";

export const Profile = ({ candidate }: { candidate: Tables<"candidates"> }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <div className="flex flex-col items-center gap-1">
          <Avatar>
            <AvatarImage
              src={candidate.photo_url!}
              alt={candidate.name}
              className="object-cover"
            />
            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
          </Avatar>
          <h6 className="text-xs">{candidate.roll_no}</h6>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {candidate.name} ({candidate.gender === "male" ? "M" : "F"})
          </DialogTitle>
          <DialogDescription>{candidate.roll_no}</DialogDescription>
        </DialogHeader>

        <div className="w-36 h-36 rounded-md border overflow-hidden">
          <Image
            src={candidate.photo_url ?? ProfileImage}
            alt={candidate.name}
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <DeleteCandidateBtn id={candidate.id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
