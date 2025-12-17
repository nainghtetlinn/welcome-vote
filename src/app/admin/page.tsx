import CreateEventCard from "@/components/create-event-card";
import EventCard from "@/components/event-card";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Admin = async () => {
  const supabase = await createClient();

  const events = await supabase.from("events_with_counts").select();

  if (events.error || !events.data) redirect("/error");

  return (
    <div className="p-4 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CreateEventCard />
      {events.data.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
};

export default Admin;
