import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/teams/[id]/members - Add a new team member
export async function POST(request, { params }) {
  const session = await getSession()

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params
  const { algorandAddress, role = "member" } = await request.json()

  // Validate input
  if (!algorandAddress) {
    return NextResponse.json({ error: "Algorand address is required" }, { status: 400 })
  }

  // Check if the team exists
  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      members: {
        where: {
          userId: session.user.id,
          role: "admin",
        },
      },
    },
  })

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 })
  }

  // Check if the current user is an admin of the team
  if (team.members.length === 0) {
    return NextResponse.json({ error: "You are not an admin of this team" }, { status: 403 })
  }

  try {
    // Find or create a user with the given Algorand address
    // First, check if a wallet with this address exists
    const existingWallet = await prisma.wallet.findUnique({
      where: { address: algorandAddress },
      include: { user: true },
    })

    let userId

    if (existingWallet) {
      // If wallet exists, use its user
      userId = existingWallet.userId
    } else {
      // If wallet doesn't exist, create a new user and wallet
      const newUser = await prisma.user.create({
        data: {
          name: `Algorand User (${algorandAddress.slice(0, 6)}...${algorandAddress.slice(-4)})`,
          wallets: {
            create: {
              address: algorandAddress,
              provider: "algorand",
            },
          },
        },
      })
      userId = newUser.id
    }

    // Check if the user is already a member of the team
    const existingMember = await prisma.teamMember.findFirst({
      where: {
        userId,
        teamId: id,
      },
    })

    if (existingMember) {
      return NextResponse.json({ error: "User is already a member of this team" }, { status: 400 })
    }

    // Add the user to the team
    const teamMember = await prisma.teamMember.create({
      data: {
        userId,
        teamId: id,
        role,
      },
    })

    return NextResponse.json({
      message: "Team member added successfully",
      teamMember,
    })
  } catch (error) {
    console.error("Error adding team member:", error)
    return NextResponse.json({ error: "Failed to add team member" }, { status: 500 })
  }
}

// GET /api/teams/[id]/members - Get all team members
export async function GET(request, { params }) {
  const session = await getSession()

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params

  try {
    // Check if the user is a member of the team
    const userMembership = await prisma.teamMember.findFirst({
      where: {
        userId: session.user.id,
        teamId: id,
      },
    })

    if (!userMembership) {
      return NextResponse.json({ error: "You are not a member of this team" }, { status: 403 })
    }

    // Get all team members
    const teamMembers = await prisma.teamMember.findMany({
      where: { teamId: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            gh_username: true,
            wallets: true,
          },
        },
      },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error getting team members:", error)
    return NextResponse.json({ error: "Failed to get team members" }, { status: 500 })
  }
}

