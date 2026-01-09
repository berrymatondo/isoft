"use client";
import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import AddButton from "@/components/AddButton";
import Search from "@/components/Search";
import NaviPages from "@/components/NaviPages";
import Navbar from "@/components/navigation/Navbar";
import AssusTable from "@/components/assu/AssusTable";
import { getAllAssurances, totalAssurances } from "@/lib/getAllAssurances";
import { authClient } from "@/lib/auth-client";

export function AssusListAssu({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const [assus, setAssus] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false);

  const session = authClient?.useSession();
  const tempo: any = session?.data?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("val: ", val);

  useEffect(() => {
    const fetchAssus = async () => {
      const data = await getAllAssurances(page, limit, search);
      //const data = res.json();

      // console.log("data: ", data);

      setAssus(data);
    };
    fetchAssus();

    const computeTotal = async () => {
      const data = await totalAssurances(true);
      // console.log("data: ", data);

      //const data = res.json();
      setTotal(data);
    };
    computeTotal();
  }, [page, search, limit]);

  const handleExportExcel = async () => {
    try {
      setExporting(true);

      const res = await fetch("/api/assus/export", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();

      // Essayer de récupérer le filename depuis Content-Disposition (si présent)
      const contentDisposition = res.headers.get("content-disposition") || "";
      const match = contentDisposition.match(/filename="(.+)"/);
      const filename = match?.[1] || "assurances.xlsx";

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
    <div className=" mx-auto w-full">
      <div className=" rounded-lg p-2 pr-0 mt-2 bg-card">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Title
              title="Liste des dossiers d'assurances"
              back={false}
              size="lg:text-xl"
            />{" "}
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
            <AddButton path="/clients/newclient" text="Nouveau Client" />
          )} */}
        </div>
        <p className="text-sm">
          {"Cette transaction permet de lister tous les dossiers d'assurances"}
        </p>
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2 bg-hov p-2 rounded-lg max-w-max border">
          <Search
            placeholder="Rechercher un dossier d'assurance ..."
            path="assus"
            search={search}
          />
        </div>

        <div className="flex items-center gap-8">
          <NaviPages
            page={page}
            limit={limit}
            total={total}
            search={search}
            path="assus"
          />
        </div>
      </div>
      <AssusTable assus={assus} userRole={val} />
    </div>
  );
}

export default AssusListAssu;
