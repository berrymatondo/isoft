import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { getSession, getUSer } from "@/lib/auth-server";

export const PUT = async (request: NextRequest) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  const assuId = path.split("clients/")[1].split("/assus/")[1];

  const { type, status, comments } = await request.json();

  const session = await getSession();
  const user = await getUSer();

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    const userTmp: any = session?.user;
    const results = await prisma.assurance.update({
      where: {
        id: +assuId,
      },
      data: {
        type: type,
        status: status,
        comments: comments,
        username: user?.name ? user?.name : "",
        userId: user?.id ? parseInt(user?.id) : null,
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
};

export const DELETE = async (request: NextRequest) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  const assuId = path.split("clients/")[1].split("/assus/")[1];

  const session = await getSession();

  try {
    const results = await prisma.assurance.delete({
      where: {
        id: +assuId,
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
};
