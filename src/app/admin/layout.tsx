import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto max-w-5xl">
      <Header />
      {children}
    </main>
  );
};

export default AdminLayout;
