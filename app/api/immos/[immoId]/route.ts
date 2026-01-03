import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ immoId: any }> }
) {
  const { immoId } = await params;

  /*   
export const GET = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const immoId = path.split("clients/")[1].split("/assus")[0];
  console.log("path vaut:", path);
  console.log("immoId vaut:", immoId); */

  //console.log("immoId vaut:", immoId);

  try {
    const immo = await prisma.immo.findUnique({
      where: {
        id: +immoId,
      },
      include: {
        person: true,
        task: true,
      },
    });

    // console.log("READ client:", client);

    return NextResponse.json({ message: "OK", immo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ immoId: any }> }
) {
  const { immoId } = await params;

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
    immoStatus,
    anaDone,
    cahierCharge,

    offerDone,
    offerAccepted,
    rechercheBien,

    startDate,
    endDate,
    demandeCours,
    fileClosed,
    notes,
  } = await request.json();

  //console.log("startDate: ", startDate, "endDate: ", endDate);

  const session = await getSession();

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    const userTmp: any = session?.user;
    const results = await prisma.immo.update({
      where: {
        id: +immoId,
      },
      data: {
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
        immoStatus,
        anaDone,
        cachierCharge: cahierCharge,

        offerDone,
        offerAccepted,
        rechercheBien,

        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,

        demandeCours,
        fileClosed,
        notes,
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
    //  return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ immoId: any }> }
) {
  const { immoId } = await params;

  try {
    const results = await prisma.assurance.delete({
      where: {
        id: +immoId,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
    //  return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}
