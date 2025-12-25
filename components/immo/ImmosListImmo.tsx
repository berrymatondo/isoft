"use client";
import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import AddButton from "@/components/AddButton";
import Search from "@/components/Search";
import NaviPages from "@/components/NaviPages";

import ImmosTable from "@/components/immo/ImmosTable";
import { authClient } from "@/lib/auth-client";
import { getAllImmos, totalImmos } from "@/lib/getAllImmos";

function ImmosListImmo({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const [immos, setImmos] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const session = authClient?.useSession();
  const tempo: any = session?.data?.user;
  const val: any = tempo ? tempo?.role : "USER";

  //console.log("tempo", page, limit, search);
  //console.log("val", val);

  useEffect(() => {
    const fetchImmos = async () => {
      const data = await getAllImmos(page, limit, search);
      //const data = res.json();

      //console.log("data: ", data);

      setImmos(data);
    };
    fetchImmos();

    const computeTotal = async () => {
      const data = await totalImmos(true);
      // console.log("data: ", data);

      //const data = res.json();
      setTotal(data);
    };
    computeTotal();
  }, [page, search, limit]);

  return (
    <div className=" mx-auto w-full">
      <div className=" rounded-lg p-2 pr-0 mt-2 bg-card">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Title
              title="Liste des dossiers immobiliers"
              back={false}
              size="lg:text-xl"
            />{" "}
            <span className="font-bold">({total})</span>
          </div>
          {/*           {(val === "ADMIN" || val === "USER") && (
            <AddButton path="/clients/newclient" text="Nouveau Client" />
          )} */}
        </div>
        <p className="text-sm">
          {"Cette transaction permet de lister tous les dossiers immobiliers"}
        </p>
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2 bg-hov p-2 rounded-lg max-w-max border">
          <Search
            placeholder="Rechercher un dossier immobilier ..."
            path="immos"
            search={search}
          />
        </div>

        <div className="flex items-center gap-8">
          <NaviPages
            page={page}
            limit={limit}
            total={total}
            search={search}
            path="immos"
          />
        </div>
      </div>
      <ImmosTable immos={immos} userRole={val} />
    </div>
  );
}

export default ImmosListImmo;
