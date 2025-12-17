import type { Metadata } from "next";
import Header from "./_components/header";

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

  return (
    <>
      <div className="bg"></div>
      <main className="container mx-auto max-w-5xl">
        <Header id={id} />
        {children}
      </main>
    </>
  );
};

export default EventLayout;
