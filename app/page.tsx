import { Sidebar } from "@/components/sidebar";
import { ClientsTable } from "@/components/clients-table";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/clients");
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/*           <ClientsTable />
           */}{" "}
        </main>
        <footer className="border-t border-border bg-card px-6 py-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Berry Matondo</span>
            <span>All rights reserved © 2023</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
