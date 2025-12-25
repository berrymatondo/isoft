"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Person } from "@prisma/client";

const clients = [
  {
    id: 1,
    prenom: "HELEN",
    nom: "ZAKAMWITA",
    telephone: "+32465740187",
    produits: "IMMO (1) - ASSU (0)",
    prenomColor: "text-primary",
    nomColor: "text-primary",
    telephoneColor: "text-foreground",
    produitsColor: "text-primary",
  },
  {
    id: 2,
    prenom: "MAUREEN",
    nom: "MBUYI",
    telephone: "+32485893944",
    produits: "IMMO (1) - ASSU (2)",
    prenomColor: "text-foreground",
    nomColor: "text-foreground",
    telephoneColor: "text-foreground",
    produitsColor: "text-foreground",
  },
  {
    id: 3,
    prenom: "ERIC JOEL",
    nom: "TCHAMENI POUANDJEU",
    telephone: "+32467686443",
    produits: "IMMO (1) - ASSU (2)",
    prenomColor: "text-foreground",
    nomColor: "text-foreground",
    telephoneColor: "text-foreground",
    produitsColor: "text-foreground",
  },
  {
    id: 4,
    prenom: "MARIE BLANCHE",
    nom: "MBIDA",
    telephone: "+32493853482",
    produits: "IMMO (1) - ASSU (0)",
    prenomColor: "text-primary",
    nomColor: "text-primary",
    telephoneColor: "text-foreground",
    produitsColor: "text-primary",
  },
  {
    id: 5,
    prenom: "BIYEYE JOSPIN",
    nom: "LUKAU",
    telephone: "+32466092771",
    produits: "IMMO (1) - ASSU (2)",
    prenomColor: "text-foreground",
    nomColor: "text-foreground",
    telephoneColor: "text-foreground",
    produitsColor: "text-foreground",
  },
];

type ClientsTableProps = {
  persons: any;
};

export function ClientsTable({ persons }: ClientsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-primary">
            Liste des clients <span className="text-foreground">(868)</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cette transaction permet de lister tous les clients
          </p>
        </div>
        <Link href="/clients/new">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Nouveau Client
          </Button>
        </Link>
      </div>

      {/* Search and Navigation */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un client ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card border-input"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-muted text-foreground hover:bg-muted/80"
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            className="bg-card text-foreground hover:bg-muted/50"
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Prénom
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Téléphone
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Produits
                </th>
              </tr>
            </thead>
            <tbody>
              {persons &&
                persons.map((client: Person, index: number) => (
                  <tr
                    key={client.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-muted/30 cursor-pointer`}
                  >
                    <td className={`px-6 py-4 text-sm font-medium `}>
                      {client.firstname}
                    </td>
                    <td className={`px-6 py-4 text-sm `}>{client.lastname}</td>
                    <td className={`px-6 py-4 text-sm `}>{client.email}</td>
                    <td className={`px-6 py-4 text-sm `}>{client.mobile}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RGPD Status */}
      <div className="flex items-center gap-6 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <span className="text-sm text-foreground">RGPD OK</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-chart-3" />
          <span className="text-sm text-chart-3">
            Attente consentement RGPD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-destructive" />
          <span className="text-sm text-destructive">
            Consentement RGPD pas généré
          </span>
        </div>
      </div>
    </div>
  );
}
