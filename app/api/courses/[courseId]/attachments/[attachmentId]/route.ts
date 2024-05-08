import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    console.log(params.attachmentId);
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT ID", error);
    return new NextResponse("Internal Eoorr", { status: 500 });
  }
}
