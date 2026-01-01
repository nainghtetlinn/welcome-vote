import CandidatesCarousel from "./_components/candidates-carousel";
import MyVotes from "./_components/my-votes";
import SubmitBtn from "./_components/submit-btn";

import { createClient } from "@/lib/supabase/server";
import { filterCandidates } from "@/lib/utils";
import { redirect } from "next/navigation";

const Vote = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const supabase = await createClient();

  const event = await supabase
    .from("events")
    .select("*, candidates(*)")
    .eq("name", id)
    .eq("active", true)
    .single();

  if (event.error || !event.data) redirect("/error");

  const { males, females } = filterCandidates(event.data.candidates);

  return (
    <>
      <section className="px-2 mb-4 space-y-2">
        <h3 className="font-bold text-2xl pt-4">Your Votes</h3>
        <MyVotes />
        <div className="flex justify-end">
          <SubmitBtn eventId={event.data.id} />
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-2xl pl-2 pt-4">Queen / Princess</h3>
        <CandidatesCarousel candidates={females} />
        <h3 className="font-bold text-2xl pl-2 pt-4">King / Prince</h3>
        <CandidatesCarousel candidates={males} />
      </section>
    </>
  );
};

export default Vote;
