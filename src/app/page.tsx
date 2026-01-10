import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const event = await supabase
    .from("events")
    .select("*")
    .eq("active", true)
    .single();

  if (event.error || !event.data) redirect("/no-event");

  const user = await supabase.auth.getUser();

  if (user.data.user?.id) {
    const submitted = await supabase
      .from("votes")
      .select()
      .eq("voter_id", user.data.user.id)
      .eq("event_id", event.data.id);
    if (!submitted.error && submitted.data.length > 0) {
      redirect("/success");
    }
  }

  redirect("/event/" + event.data.name);
}
