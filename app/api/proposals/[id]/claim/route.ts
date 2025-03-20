import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Remove explicit type annotations for the route handler parameters
export async function POST(request, { params }) {
  const session = await getSession();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  // Check if the proposal exists
  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      team_relation: true,
    },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Get the user's GitHub username from their accounts
  const userAccount = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "github",
    },
  });

  if (!userAccount) {
    return NextResponse.json(
      { error: "No GitHub account found for user" },
      { status: 400 }
    );
  }

  // Get the user's GitHub username
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.gh_username) {
    // Update the user's GitHub username from their account
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        gh_username: userAccount.providerAccountId,
      },
    });
  }

  // Extract GitHub username from team name (format: "Name (@github_username)")
  let proposalGithubUsername: string | null = null;
  const teamNameMatch = proposal.team.match(/$$@([^)]+)$$/);

  if (teamNameMatch && teamNameMatch[1]) {
    proposalGithubUsername = teamNameMatch[1];
  }

  // Check if the user's GitHub username matches the proposal's GitHub username
  const userGithubUsername = user?.gh_username || userAccount.providerAccountId;

  if (
    !proposalGithubUsername ||
    proposalGithubUsername.toLowerCase() !== userGithubUsername.toLowerCase()
  ) {
    return NextResponse.json(
      {
        error:
          "Your GitHub username does not match the proposal's GitHub username",
        userGithubUsername,
        proposalGithubUsername,
      },
      { status: 403 }
    );
  }

  // Check if the user is already a member of the team
  const existingMember = await prisma.teamMember.findFirst({
    where: {
      userId: session.user.id,
      teamId: proposal.teamId,
    },
  });

  if (existingMember) {
    return NextResponse.json({
      message: "You are already a member of this team",
    });
  }

  // Add the user to the team
  const teamMember = await prisma.teamMember.create({
    data: {
      userId: session.user.id,
      teamId: proposal.teamId,
      role: "member",
    },
  });

  return NextResponse.json({
    message: "Successfully claimed proposal",
    teamMember,
  });
}

// Remove explicit type annotations for the route handler parameters
export async function GET(request, { params }) {
  const session = await getSession();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Check if the user is a member of the team for this proposal
  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      team_relation: {
        include: {
          members: {
            where: {
              userId: session.user.id,
            },
          },
        },
      },
    },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  const isMember = proposal.team_relation.members.length > 0;

  return NextResponse.json({
    isMember,
    teamId: proposal.teamId,
  });
}
