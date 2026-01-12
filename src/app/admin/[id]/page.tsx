import { filterCandidates } from "@/lib/utils";
import { CreateCandidateBtn } from "./_components/create-candidate-btn";
import { EventDetailsHeader } from "./_components/event-details-header";
import { ResultChart } from "./_components/result-chart";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase";
import { redirect } from "next/navigation";
import CandidatesCarousel from "./_components/candidates-carousel";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: name } = await params;

  const supabase = await createClient();

  const eventResult = await supabase
    .from("events")
    .select()
    .eq("name", name)
    .single();

  const candidateResults = await supabase
    .from("candidates")
    .select()
    .eq("event_id", eventResult.data!.id);

  const votingResults = await supabase
    .from("voting_results")
    .select()
    .eq("event_id", eventResult.data!.id);

  if (eventResult.error || candidateResults.error || votingResults.error)
    redirect("/error");

  if (!eventResult.data || !candidateResults.data || !votingResults.data)
    redirect("/admin");

  const grouped = votingResults.data.reduce<{
    king: Tables<"voting_results">[];
    queen: Tables<"voting_results">[];
    prince: Tables<"voting_results">[];
    princess: Tables<"voting_results">[];
  }>(
    (g, c) => {
      if (c.category_id == 1) g.king.push(c);
      else if (c.category_id == 2) g.queen.push(c);
      else if (c.category_id == 3) g.prince.push(c);
      else if (c.category_id == 4) g.princess.push(c);

      return g;
    },
    { king: [], queen: [], prince: [], princess: [] }
  );

  const { males, females } = filterCandidates(candidateResults.data);

  return (
    <div className="p-4 space-y-8">
      <EventDetailsHeader event={eventResult.data} />

      <section className="space-y-2">
        <h4 className="font-bold text-lg">Create Candidate</h4>
        <CreateCandidateBtn />
      </section>

      <section className="space-y-2">
        <h4 className="font-bold text-lg">Candidates (Males)</h4>
        <CandidatesCarousel candidates={males} />
      </section>

      <section className="space-y-2">
        <h4 className="font-bold text-lg">Candidates (Females)</h4>
        <CandidatesCarousel candidates={females} />
      </section>

      <h3 className="font-bold text-lg mb-4">Result Chart</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ResultChart
          title="King"
          candidates={grouped.king}
        />
        <ResultChart
          title="Queen"
          candidates={grouped.queen}
        />
        <ResultChart
          title="Prince"
          candidates={grouped.prince}
        />
        <ResultChart
          title="Princess"
          candidates={grouped.princess}
        />
      </section>
    </div>
  );
};

export default EventDetails;
