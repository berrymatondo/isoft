//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { getSession, getUSer } from "@/lib/auth-server";

export const POST = async (request: NextRequest) => {
  const {
    maritalStatus,
    salNet,
    salNetCo,
    chqRep,
    chqRepCo,
    autRev,
    autRevCo,
    prtTmp,
    prtTmpCo,
    autPrt,
    autPrtCo,
    notes,
    demAmount,
    taux,
  } = await request.json();
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/immos")[0];
  // console.log("ASSURANCE clientId vaut:", clientId);
  /*   console.log("obj", {
    maritalStatus,
    salNet,
    salNetCo,
    chqRep,
    chqRepCo,
    autRev,
    autRevCo,
    prtTmp,
    prtTmpCo,
    autPrt,
    autPrtCo,
    notes,
    demAmount,
    taux,
  }); */

  const session = await getSession();
  const user = await getUSer();

  console.log("user", user);

  try {
    const userTmp: any = session?.user;
    const assus = await prisma.immo.create({
      data: {
        personId: +clientId,
        maritalStatus: maritalStatus,
        salNet,
        salNetCo,
        chqRep,
        chqRepCo,
        autRev,
        autRevCo,
        prtTmp,
        prtTmpCo,
        autPrt,
        autPrtCo,
        notes,
        demAmount: 0,
        taux: 0,
        username: user?.name ? user?.name : "",
        userId: user?.id ? parseInt(user?.id) : null,
      },
    });

    return NextResponse.json({ message: "OK", assus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/immos")[0];

  try {
    const results = await prisma.immo.findMany({
      where: {
        personId: +clientId,
      },
    });

    //    console.log("results", results);

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
