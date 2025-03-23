import { getSession } from "@/lib/auth"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request, { params }) {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const commentId = params.id

    if (!commentId) {
      return NextResponse.json({ message: "Comment ID is required" }, { status: 400 })
    }

    const userId = session.user.id

    // Find the comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    // Check if user is the comment author
    if (comment.userId !== userId) {
      return NextResponse.json({ message: "You can only delete your own comments" }, { status: 403 })
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete comment error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

