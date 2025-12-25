//"use client";

//import { authOptions } from "./api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

import Rightbar from "@/components/dashboard/rightbar/Rightbar";
import Transactions from "@/components/dashboard/Transactions";
import ClientDash from "@/components/client/ClientDash";
import Chart from "@/components/dashboard/Chart";
import AssuDash from "@/components/assu/AssuDash";
import ImmoDash from "@/components/immo/ImmoDash";
import ActionDash from "@/components/action/ActionDash";
import { getSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  //if (!session) redirect("/auth/login");

  // redirect("/dashboard");

  return (
    <div className="flex gap-5 mt-5 max-md:px-1">
      <div className="flex-[3_3_0%] flex flex-col gap-5 w-full">
        <div className="md:flex md:justify-between md:gap-5 md:w-full max-md:grid max-md:grid-cols-2 max-md:gap-2">
          <ClientDash />
          <AssuDash />
          <ImmoDash />
          <ActionDash />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className="flex-1 max-md:hidden">
        <Rightbar />
      </div>
    </div>

    /*     <main>
      <Header />
      {<span>USER</span>}
    </main> */
  );
}
