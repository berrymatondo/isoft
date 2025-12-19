import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  // Si ton id Prisma est Int
  /*   const id = Number(userId);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  } */

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }, // <-- number
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
