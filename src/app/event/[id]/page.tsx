import SubmitBtn from "./_components/submit-btn";
import Vote from "./_components/vote";

import { createClient } from "@/lib/supabase/server";
import { filterCandidates } from "@/lib/utils";
import { redirect } from "next/navigation";

const VotingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
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
      <section className="space-y-2 px-4 mt-4">
        <Vote
          category="king"
          candidates={males}
        />
        <Vote
          category="queen"
          candidates={females}
        />
        <Vote
          category="prince"
          candidates={males}
        />
        <Vote
          category="princess"
          candidates={females}
        />
        <div className="flex justify-end">
          <SubmitBtn eventId={event.data.id} />
        </div>
      </section>
    </>
  );
};

export default VotingPage;
