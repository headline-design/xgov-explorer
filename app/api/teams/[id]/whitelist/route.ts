import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

// POST /api/teams/[id]/whitelist - Add a new address to the whitelist
export async function POST(request, { params }) {
  const session = await getSession()

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params
  const { address } = await request.json()

  // Validate input
  if (!address) {
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
    // Check if the address is already whitelisted
    const existingAddress = await prisma.whitelistedAddress.findFirst({
      where: {
        address,
        teamId: id,
      },
    })

    if (existingAddress) {
      return NextResponse.json({ error: "Address is already whitelisted" }, { status: 400 })
    }

    // Add the address to the whitelist
    const whitelistedAddress = await prisma.whitelistedAddress.create({
      data: {
        address,
        teamId: id,
      },
    })

    return NextResponse.json({
      message: "Address added to whitelist successfully",
      whitelistedAddress,
    })
  } catch (error) {
    console.error("Error adding address to whitelist:", error)
    return NextResponse.json({ error: "Failed to add address to whitelist" }, { status: 500 })
  }
}

// GET /api/teams/[id]/whitelist - Get all whitelisted addresses
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

    // Get all whitelisted addresses
    const whitelistedAddresses = await prisma.whitelistedAddress.findMany({
      where: { teamId: id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(whitelistedAddresses)
  } catch (error) {
    console.error("Error getting whitelisted addresses:", error)
    return NextResponse.json({ error: "Failed to get whitelisted addresses" }, { status: 500 })
  }
}

