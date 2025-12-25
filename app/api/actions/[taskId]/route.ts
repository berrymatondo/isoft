import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

type Ctx = { params: Promise<{ taskId: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  const { taskId } = await params;

  const { done, description } = await request.json();
  const session = await getSession();
  const userTmp: any = session?.user;

  try {
    const results = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        done,
        description,
        username: userTmp?.username ?? "",
        userId: userTmp?.id ? Number(userTmp.id) : null,
      },
    });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* export async function GET(_request: NextRequest, { params }: Ctx) {
  const { taskId } = await params;

  try {
    const action = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { person: true },
    });

    return NextResponse.json({ message: "OK", action }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  const { taskId } = await params;

  try {
    const results = await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
 */
