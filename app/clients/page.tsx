import ClientsListClient from "@/components/client/ClientsListClient";
import { getUSer } from "@/lib/auth-server";
import { redirect } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getUSer();
  console.log("user:", user);

  if (!user) {
    console.log("ici 1");

    redirect("/auth/signin");
  }

  console.log("ici 2");

  const sp = await searchParams;

  const page = typeof sp.page === "string" ? Number(sp.page) : 1;
  const limit = typeof sp.limit === "string" ? Number(sp.limit) : 5;
  const search = typeof sp.search === "string" ? sp.search : undefined;

  return <ClientsListClient page={page} limit={limit} search={search} />;
}
