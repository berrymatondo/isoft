import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const page = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  const limit = url.searchParams.get("limit")
    ? Number(url.searchParams.get("limit"))
    : 5;

  const search = url.searchParams.get("search")
    ? String(url.searchParams.get("search"))
    : "";

  const skip = (page - 1) * limit;

  try {
    const select = {
      id: true,
      description: true,
      done: true,
      type: true,
      person: true,
      immo: true,
      assurance: true,
    } as const;

    const results =
      search.length < 1
        ? await prisma.task.findMany({
            select,
            take: limit,
            skip,
          })
        : await prisma.task.findMany({
            where: {
              OR: [
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  person: {
                    firstname: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  person: {
                    lastname: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            },
            select,
            take: limit,
            skip,
          });

    // Optionnel (pas très utile sur une route API GET)
    const path = request.nextUrl.pathname || "/";
    revalidatePath(path);

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
