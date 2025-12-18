import { Header } from "./_components/header";

import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();
  if (user.data.user?.is_anonymous) return redirect("/login");

  return (
    <main className="container mx-auto max-w-5xl">
      <Header />
      {children}
    </main>
  );
};

export default AdminLayout;
