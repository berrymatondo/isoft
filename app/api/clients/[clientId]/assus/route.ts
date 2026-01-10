//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { getSession, getUSer } from "@/lib/auth-server";

export const POST = async (request: NextRequest) => {
  const { assudenom, assustatus, description } = await request.json();
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  //console.log("ASSURANCE clientId vaut:", clientId);
  // console.log("obj", { assudenom, assustatus, description });

  const session = await getSession();
  const user = await getUSer();

  try {
    const userTmp: any = session?.user;
    const assus = await prisma.assurance.create({
      data: {
        type: assudenom,
        status: assustatus,
        comments: description,
        personId: +clientId,
        username: user?.name ? user?.name : "",
        userId: user?.id ? parseInt(user?.id) : null,
      },
    });

    //console.log("assus:", assus);

    return NextResponse.json({ message: "OK", assus }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];

  try {
    const results = await prisma.assurance.findMany({
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
