"use client";

import ProfileImage from "@/assets/profile.png";

import { useVoteContext } from "@/providers/vote-provider";
import Image from "next/image";

export const SelectedVotes = ({ type }: { type: "male" | "female" }) => {
  const { votes } = useVoteContext();

  const first = type === "male" ? votes.king : votes.queen;
  const second = type === "male" ? votes.prince : votes.princess;

  return (
    <div className="flex gap-2">
      <div className="relative w-10 aspect-square rounded-full overflow-hidden">
        <Image
          src={first?.photo_url || ProfileImage}
          alt={first?.name || "avatar"}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative w-10 aspect-square rounded-full overflow-hidden">
        <Image
          src={second?.photo_url || ProfileImage}
          alt={second?.name || "avatar"}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
