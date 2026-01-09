// app/clients/nouveau/succes/page.tsx
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-xl border bg-background p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Enregistrement réussi</h1>
            <p className="text-sm text-muted-foreground">
              Votre inscription a bien été prise en compte. Merci ! Vous pouvez
              revenir au formulaire si vous souhaitez enregistrer un autre
              client.
            </p>

            <div className="pt-3">
              <Button className="bg-green-600 text-white" asChild>
                <Link href="/rgpd/clients/new">
                  Revenir au formulaire d’inscription
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
