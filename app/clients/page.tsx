import { ClientsTable } from "@/components/clients-table";
import NotConnected from "@/components/notConnected";
import { getUSer } from "@/lib/auth-server";
import React from "react";

const ClientsPage = async () => {
  const user = await getUSer();

  //console.log("USER", user);

  if (!user) return <NotConnected />;

  return (
    <div>
      <ClientsTable />
    </div>
  );
};

export default ClientsPage;
