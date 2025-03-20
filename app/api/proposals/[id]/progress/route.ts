import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest, { params }) {
   const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { title, content, completionPercentage } = await req.json();

  // Validate input
  if (!title || !content || typeof completionPercentage !== "number") {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Check if the proposal exists
  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      team_relation: {
        include: {
          members: {
            where: {
              userId: session.user.id ?? "",
            },
          },
        },
      },
    },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Check if the user is a member of the team
  const isTeamMember = proposal.team_relation.members.length > 0;

  // Allow admins to update any proposal
  const isAdmin = session.user.role === "admin";

  if (!isTeamMember && !isAdmin) {
    return NextResponse.json(
      { error: "You are not authorized to update this proposal" },
      { status: 403 }
    );
  }

  // Create the progress update
  const progressUpdate = await prisma.progressUpdate.create({
    data: {
      title,
      content,
      completionPercentage,
      proposalId: id,
      userId: session.user.id ?? "",
    },
  });

  // Update the proposal's completion percentage
  await prisma.proposal.update({
    where: { id },
    data: {
      completionPercentage,
      status:
        completionPercentage >= 100
          ? "Completed"
          : completionPercentage > 0
          ? "In Progress"
          : "Planning",
    },
  });

  return NextResponse.json(progressUpdate);
}

export async function GET(req: NextRequest, { params }) {
  const { id } = await params;

  // Check if the proposal exists
  const proposal = await prisma.proposal.findUnique({
    where: { id },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Get all progress updates for this proposal
  const progressUpdates = await prisma.progressUpdate.findMany({
    where: { proposalId: id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(progressUpdates);
}
