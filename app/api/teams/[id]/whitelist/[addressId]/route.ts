import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

// DELETE /api/teams/[id]/whitelist/[addressId] - Remove an address from the whitelist
export async function DELETE(request, { params }) {
  const session = await getSession()

  // Authentication check
  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, addressId } = params

  try {
    // Check if the current user is an admin of the team
    const userMembership = await prisma.teamMember.findFirst({
      where: {
        userId: session.user.id,
        teamId: id,
        role: "admin",
      },
    })

    if (!userMembership) {
      return NextResponse.json({ error: "You are not an admin of this team" }, { status: 403 })
    }

    // Get the address to be removed
    const addressToRemove = await prisma.whitelistedAddress.findUnique({
      where: { id: addressId },
    })

    if (!addressToRemove) {
      return NextResponse.json({ error: "Whitelisted address not found" }, { status: 404 })
    }

    // Check if the address belongs to the team
    if (addressToRemove.teamId !== id) {
      return NextResponse.json({ error: "Address does not belong to this team" }, { status: 403 })
    }

    // Remove the address from the whitelist
    await prisma.whitelistedAddress.delete({
      where: { id: addressId },
    })

    return NextResponse.json({
      message: "Address removed from whitelist successfully",
    })
  } catch (error) {
    console.error("Error removing address from whitelist:", error)
    return NextResponse.json({ error: "Failed to remove address from whitelist" }, { status: 500 })
  }
}

