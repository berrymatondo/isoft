import React from "react";

import Link from "next/link";
import { TableCell, TableRow } from "./ui/table";

type PersonItemProps = {
  ctr: any;
};

const PersonItem = ({ ctr }: PersonItemProps) => {
  //console.log("ctr: ", ctr);

  // const router = useRouter();
  return (
    <TableRow className="hover:cursor-pointer" key={ctr.id}>
      <TableCell
        // onClick={() => router.push(`/continents/${ctr.continent}/${ctr.id}`)}
        className=" text-sky-700 dark:text-sky-500"
      >
        <Link
          className="flex gap-2 font-medium"
          href={`/clients/${ctr.id}`}
          //href={`/continents/${ctr.continent}/${ctr.id}`}
        >
          <span>{ctr.name?.replaceAll("_", " ")}</span>
        </Link>
      </TableCell>
      <TableCell
        className="max-md:text-xs text-sm italic text-right"
        // onClick={() => router.push(`/continents/${ctr.continent}`)}
      >
        <Link href={`/continents/${ctr.continent}`}>xxxx</Link>
      </TableCell>
    </TableRow>
  );
};

export default PersonItem;
