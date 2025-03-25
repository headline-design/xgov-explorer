import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

// PATCH - Update a progress update
export async function PATCH(req: NextRequest, { params }) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: proposalId, updateId } = await params;
    const { title, content, completionPercentage } = await req.json();

    // Validate input
    if (!title || !content || completionPercentage === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the progress update exists
    const progressUpdate = await prisma.progressUpdate.findUnique({
      where: { id: updateId },
      include: { proposal: true },
    });

    if (!progressUpdate) {
      return NextResponse.json(
        { error: "Progress update not found" },
        { status: 404 }
      );
    }

    // Check if the user is the author of the progress update
    if (progressUpdate.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You can only edit your own progress updates" },
        { status: 403 }
      );
    }

    // Check if the progress update belongs to the specified proposal
    if (progressUpdate.proposalId !== proposalId) {
      return NextResponse.json(
        { error: "Progress update does not belong to this proposal" },
        { status: 400 }
      );
    }

    // Update the progress update
    const updatedProgressUpdate = await prisma.progressUpdate.update({
      where: { id: updateId },
      data: {
        title,
        content,
        completionPercentage,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Update the proposal's completion percentage if this is the most recent update
    const latestUpdate = await prisma.progressUpdate.findFirst({
      where: { proposalId },
      orderBy: { createdAt: "desc" },
    });

    if (latestUpdate?.id === updateId) {
      await prisma.proposal.update({
        where: { id: proposalId },
        data: { completionPercentage },
      });
    }

    return NextResponse.json(updatedProgressUpdate);
  } catch (error) {
    console.error("Error updating progress update:", error);
    return NextResponse.json(
      { error: "Failed to update progress update" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a progress update
export async function DELETE(req: NextRequest, { params }) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: proposalId, updateId } = await params;

    // Check if the progress update exists
    const progressUpdate = await prisma.progressUpdate.findUnique({
      where: { id: updateId },
      include: { proposal: true },
    });

    if (!progressUpdate) {
      return NextResponse.json(
        { error: "Progress update not found" },
        { status: 404 }
      );
    }

    // Check if the user is the author of the progress update
    if (progressUpdate.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You can only delete your own progress updates" },
        { status: 403 }
      );
    }

    // Check if the progress update belongs to the specified proposal
    if (progressUpdate.proposalId !== proposalId) {
      return NextResponse.json(
        { error: "Progress update does not belong to this proposal" },
        { status: 400 }
      );
    }

    // Delete the progress update
    await prisma.progressUpdate.delete({
      where: { id: updateId },
    });

    // If this was the latest update, update the proposal's completion percentage based on the previous update
    const latestUpdate = await prisma.progressUpdate.findFirst({
      where: { proposalId },
      orderBy: { createdAt: "desc" },
    });

    if (latestUpdate) {
      await prisma.proposal.update({
        where: { id: proposalId },
        data: { completionPercentage: latestUpdate.completionPercentage },
      });
    } else {
      // If no updates left, reset to 0
      await prisma.proposal.update({
        where: { id: proposalId },
        data: { completionPercentage: 0 },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting progress update:", error);
    return NextResponse.json(
      { error: "Failed to delete progress update" },
      { status: 500 }
    );
  }
}
