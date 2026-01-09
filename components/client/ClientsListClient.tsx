"use client";
import React, { useEffect, useState } from "react";
// ... tes imports
import { getAllclients, totalClients } from "@/lib/getAllClients";
import { authClient } from "@/lib/auth-client";
import Title from "../Title";
import AddButton from "../AddButton";
import Search from "../Search";
import NaviPages from "../NaviPages";
import ClientsTable from "./ClientsTable";
import { FaSquare } from "react-icons/fa";

export default function ClientsListClient({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const [clients, setClients] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false);

  const session = authClient?.useSession();
  const tempo: any = session?.data?.user;
  const val: any = tempo ? tempo?.role : "USER";

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getAllclients(page, limit, search);
      setClients(data);
    };

    const computeTotal = async () => {
      const data = await totalClients(true);
      setTotal(data);
    };

    fetchClients();
    computeTotal();
  }, [page, limit, search]);

  const handleExportExcel = async () => {
    try {
      setExporting(true);

      const res = await fetch("/api/clients/export", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();

      // Essayer de récupérer le filename depuis Content-Disposition (si présent)
      const contentDisposition = res.headers.get("content-disposition") || "";
      const match = contentDisposition.match(/filename="(.+)"/);
      const filename = match?.[1] || "clients.xlsx";

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'export Excel.");
    } finally {
      setExporting(false);
    }
  };

  return (
    // ton JSX inchangé
    <div className=" mx-auto w-full max-md:px-2">
      <div className=" rounded-lg md:p-2 pr-0 mt-2 bg-card">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Title title="Liste des clients" back={false} size="lg:text-xl" />{" "}
            <span className="font-bold">({total})</span>
          </div>
          <div className="flex items-center gap-2 pr-2">
            {/* Bouton Export Excel */}
            <button
              onClick={handleExportExcel}
              disabled={exporting}
              className="border rounded-lg px-3 py-2 text-sm bg-hov hover:opacity-90 disabled:opacity-60"
            >
              {exporting ? "Export en cours..." : "Exporter Excel"}
            </button>

            {/* Exemple: bouton add si tu veux le remettre */}
            {/* {(val === "ADMIN" || val === "USER") && (
              <AddButton path="/clients/newclient" text="Nouveau Client" />
            )} */}
          </div>
          {/*           {(val === "ADMIN" || val === "USER") && (
           */}{" "}
          <AddButton path="/clients/newclient" text="Nouveau Client" />
          {/*           )}
           */}{" "}
        </div>
        <p className="text-sm  max-md:text-xs">
          Cette transaction permet de lister tous les clients
        </p>
      </div>
      <div className="flex justify-between items-center my-5 border rounded-lg">
        <div className="flex items-center gap-2 bg-hov p-2 rounded-lg max-w-max">
          <Search
            placeholder="Rechercher un client ..."
            path="clients"
            search={search}
          />
        </div>

        <div className="flex items-center gap-8">
          <NaviPages
            path="clients"
            page={page}
            limit={limit}
            total={total}
            search={search}
          />
        </div>
      </div>

      <ClientsTable clients={clients} userRole={val} />
      <div className="bg-hov p-2 mt-2 flex justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-2">
        <span className="flex items-center text-sm gap-1  max-md:text-xs">
          <FaSquare /> RGPD OK
        </span>
        <span className="flex items-center text-sm gap-1 text-orange-400  max-md:text-xs">
          <FaSquare /> Attente consentement RGPD
        </span>
        <span className="flex items-center text-sm gap-1 text-red-400  max-md:text-xs">
          <FaSquare /> Consentement RGPD pas généré
        </span>
      </div>
    </div>
  );
}
