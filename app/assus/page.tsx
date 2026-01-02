import AssusListAssu from "@/components/assu/AssusListAssu";
import { getUSer } from "@/lib/auth-server";
import { redirect } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const page = typeof sp.page === "string" ? Number(sp.page) : 1;
  const limit = typeof sp.limit === "string" ? Number(sp.limit) : 5;
  const search = typeof sp.search === "string" ? sp.search : undefined;

  const user = await getUSer();

  if (!user) {
    redirect("/auth/signin");
  }

  return <AssusListAssu page={page} limit={limit} search={search} />;
}
