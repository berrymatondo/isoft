import { NewClientForm } from "@/components/form/new-client-form";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="mb-6">
            <h1 className="text-balance text-3xl font-bold text-primary">
              Créer un client
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Cette transaction permet d'ajouter un nouveau client
            </p>
          </div>
          <NewClientForm />
        </main>
      </div>
    </div>
  );
}
