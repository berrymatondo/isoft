import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: any }> }
) {
  const { clientId } = await params;

  /*   
export const GET = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  console.log("path vaut:", path);
  console.log("clientId vaut:", clientId); */

  console.log("clientId vaut:", clientId);

  try {
    const client = await prisma.person.findUnique({
      where: {
        id: +clientId,
      },
      include: {
        immos: true,
        assus: true,
        task: true,
      },
    });

    // console.log("READ client:", client);

    return NextResponse.json({ message: "OK", client }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}

export const PUT = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];

  const {
    firstName,
    lastName,
    email,
    gender,
    maritalStatus,
    birthdate,
    mobile,
    address,
    notes,
  } = await request.json();

  const session = await getSession();

  try {
    const userTmp: any = session?.user;
    const client = await prisma.person.update({
      where: {
        id: +clientId,
      },
      data: {
        email: email,
        notes: notes,
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        maritalstatus: maritalStatus,
        birthday: new Date(birthdate),
        mobile: mobile,
        address: address,
        // createAt: new Date(),
        // updatedAt: new Date(),
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    //console.log("READ client:", client);

    return NextResponse.json({ message: "OK", client }, { status: 200 });
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
