import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  ////console.log("iciiiii");

  try {
    const param = await prisma.parameter.findUnique({
      where: {
        name: "origin",
      },
    });

    //  console.log("READ  param:", param?.origin);

    return NextResponse.json({ message: "OK", param }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { origin } = await request.json();

  //console.log("startDate: ", origin);

  const session = await getSession();

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    const param = await prisma.parameter.update({
      where: {
        name: "origin",
      },
      data: {
        origin: origin,
      },
    });

    //  console.log("param", param);

    return NextResponse.json({ message: "OK", param }, { status: 200 });
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
