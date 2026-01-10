import type { Metadata } from "next";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  return { title: "IT Welcome Voter | " + (await params).id };
};

const EventLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (user.data.user && !user.data.user.is_anonymous) {
    redirect("/admin");
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <Header id={id} />
      <main className="relative container mx-auto max-w-5xl pb-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default EventLayout;
