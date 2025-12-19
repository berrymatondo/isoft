import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      include: {
        rgpd: true,
      },
    });

    return NextResponse.json(persons, { status: 200 });
  } catch (err) {
    console.error("Error fetching persons:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
