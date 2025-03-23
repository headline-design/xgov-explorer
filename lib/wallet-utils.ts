import prisma from "@/lib/prisma"

/**
 * Checks if an address is whitelisted for a specific team
 */
export async function isAddressWhitelisted(address: string, teamId: string): Promise<boolean> {
  try {
    const whitelistedAddress = await prisma.whitelistedAddress.findFirst({
      where: {
        teamId,
        address,
      },
    })

    return !!whitelistedAddress
  } catch (error) {
    console.error("Error checking if address is whitelisted:", error)
    return false
  }
}

/**
 * Gets all teams where an address is whitelisted
 */
export async function getTeamsForWhitelistedAddress(address: string) {
  try {
    const whitelistedAddresses = await prisma.whitelistedAddress.findMany({
      where: {
        address,
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return whitelistedAddresses.map((wa) => wa.team)
  } catch (error) {
    console.error("Error getting teams for whitelisted address:", error)
    return []
  }
}

/**
 * Checks if a user has a specific wallet address linked to their account
 */
export async function isWalletLinkedToUser(userId: string, address: string): Promise<boolean> {
  try {
    const wallet = await prisma.wallet.findFirst({
      where: {
        userId,
        address,
      },
    })

    return !!wallet
  } catch (error) {
    console.error("Error checking if wallet is linked to user:", error)
    return false
  }
}

/**
 * Gets all whitelisted addresses for a user across all teams they belong to
 */
export async function getWhitelistedAddressesForUser(userId: string) {
  try {
    // Get all teams the user is a member of
    const teamMemberships = await prisma.teamMember.findMany({
      where: {
        userId,
      },
      select: {
        teamId: true,
      },
    })

    const teamIds = teamMemberships.map((tm) => tm.teamId)

    // Get all whitelisted addresses for these teams
    const whitelistedAddresses = await prisma.whitelistedAddress.findMany({
      where: {
        teamId: {
          in: teamIds,
        },
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return whitelistedAddresses
  } catch (error) {
    console.error("Error getting whitelisted addresses for user:", error)
    return []
  }
}

/**
 * Checks if a wallet address is valid for Algorand
 */
export function isValidAlgorandAddress(address: string): boolean {
  // Basic validation - Algorand addresses are 58 characters long and start with "ALGO"
  // This is a simplified check - in a real app, you'd want to use the Algorand SDK
  return address.length === 58 && address.startsWith("ALGO")
}

