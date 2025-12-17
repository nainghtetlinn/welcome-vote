import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const event = await supabase.from("events").select("*").eq("active", true);

  console.log(event);

  //   if (event.error || !event.data) redirect("/error");

  //   redirect("/event/" + event.data?.name);

  return <div>Hello</div>;
}
