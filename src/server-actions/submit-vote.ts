"use server";

import { createClient } from "@/lib/supabase/server";
import { createError, onlyUnique } from "@/lib/utils";
import { ErrorResponse } from "@/types/error";
import { redirect } from "next/navigation";

type TVote = {
  king: string;
  queen: string;
  prince: string;
  princess: string;
};

export const submitVote = async (
  data: TVote,
  eventId: string
): Promise<ErrorResponse> => {
  const supabase = await createClient();
  const userResult = await supabase.auth.getUser();

  if (userResult.error) return createError(userResult.error);

  const voter = userResult.data.user;

  /**
    check if voter have already voted
   */
  const votesResult = await supabase
    .from("votes")
    .select()
    .eq("voter_id", voter.id)
    .eq("event_id", eventId);
  if (votesResult.error) return createError(votesResult.error);
  if (votesResult.data.length > 0)
    return createError("Already voted", "You have already voted");
  /********************************/

  /**
    check if all votes are valid
   */
  const votes = [data.king, data.queen, data.prince, data.princess];

  const candidatesResult = await supabase
    .from("candidates")
    .select()
    .in("id", votes)
    .eq("event_id", eventId);
  if (candidatesResult.error) return createError(candidatesResult.error);
  console.log(candidatesResult.data);
  console.log(votes.filter(onlyUnique));
  if (candidatesResult.data.length !== votes.filter(onlyUnique).length)
    return {
      success: false,
      message: "Invalid votes",
    };
  /********************************/

  /**
    create votes
   */
  const result = await supabase.from("votes").insert([
    {
      category_id: 1,
      candidate_id: data.king,
      event_id: eventId,
      voter_id: voter.id,
    },
    {
      category_id: 2,
      candidate_id: data.queen,
      event_id: eventId,
      voter_id: voter.id,
    },
    {
      category_id: 3,
      candidate_id: data.prince,
      event_id: eventId,
      voter_id: voter.id,
    },
    {
      category_id: 4,
      candidate_id: data.princess,
      event_id: eventId,
      voter_id: voter.id,
    },
  ]);
  if (result.error) return createError(result.error);
  /********************************/

  redirect("/success");
};
