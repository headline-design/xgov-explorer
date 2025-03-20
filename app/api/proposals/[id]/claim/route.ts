import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request, { params }) {
  const session = await getSession();

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (!user.gh_username) {
    return NextResponse.json(
      { error: "GitHub username not found for user" },
      { status: 400 }
    );
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

  // Check if the proposal is already claimed
  if (proposal.claimed) {
    return NextResponse.json({
      message: "This proposal has already been claimed",
      claimed: true,
    });
  }

  // Get the user's GitHub username - first try from session
  const userGithubUsername = user.gh_username;

  // Extract GitHub username from team name (format: "Name (@github_username)")
  const githubUsernameMatch = proposal.team.match(/@([^)]+)/);
  const proposalGithubUsername = githubUsernameMatch
    ? githubUsernameMatch[1]
    : null;

  // Security check: Verify the GitHub username matches
  if (!proposalGithubUsername) {
    return NextResponse.json(
      { error: "No GitHub username found in the proposal team name" },
      { status: 400 }
    );
  }

  // Case-insensitive comparison of GitHub usernames
  if (
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
    // If the user is already a member, mark the proposal as claimed if it's not already
    await prisma.proposal.update({
      where: { id },
      data: { claimed: true },
    });

    return NextResponse.json({
      message: "You are already a member of this team",
      claimed: true,
    });
  }

  try {
    // Add the user to the team and mark the proposal as claimed
    const teamMember = await prisma.teamMember.create({
      data: {
        userId: session.user.id,
        teamId: proposal.teamId,
        role: "member",
      },
    });

    // Update the proposal's claimed status
    await prisma.proposal.update({
      where: { id },
      data: { claimed: true },
    });

    return NextResponse.json({
      message: "Successfully claimed proposal",
      teamMember,
      claimed: true,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to add you to the team" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    // Check if the user is a member of the team for this proposal
    // and if the proposal is claimed
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      select: {
        claimed: true,
        teamId: true,
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
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    const isMember = proposal.team_relation.members.length > 0;

    return NextResponse.json({
      isMember,
      claimed: proposal.claimed || false,
      teamId: proposal.teamId,
    });
  } catch (error) {
    console.error("Error checking team membership:", error);
    return NextResponse.json(
      { error: "Failed to check team membership" },
      { status: 500 }
    );
  }
}
