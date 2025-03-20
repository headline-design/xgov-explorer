import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { TeamDashboard } from "@/components/team-dashboard"

import type { Proposal, Team, TeamMember, User, Wallet, WhitelistedAddress } from "@prisma/client"

interface ExtendedUser {
    id: string,
    name: string | null,
    image: string | null,
    email: string | null,
    gh_username: string | null,
    createdAt: Date,
    updatedAt: Date,
    wallets: Wallet[]
}

interface ExtendedTeamMember extends TeamMember {
    user: ExtendedUser
}

interface ExtendedTeam extends Team {
    members: ExtendedTeamMember[]
    whitelistedAddresses: WhitelistedAddress[]
    proposals: Proposal[]
}

export interface TeamDashboardProps {
    teams: ExtendedTeam[]
    currentUserId: string
}

export const metadata = {
    title: "Team Dashboard | xGov Explorer",
    description: "Manage your teams and proposal updates",
}

async function getUserTeams(userId: string) {
    const teams = await prisma.team.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            email: true,
                            gh_username: true,
                            wallets: {
                                select: {
                                    address: true,
                                    network: true,
                                    vm: true,
                                    chainId: true,
                                    status: true,
                                    userId: true,
                                    createdAt: true,
                                    updatedAt: true,
                                },
                            },
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
            whitelistedAddresses: {
                orderBy: { createdAt: "desc" },
            },
            proposals: {
                select: {
                    id: true,
                    title: true,
                    completionPercentage: true,
                    status: true,
                    claimed: true,
                    number: true,
                    team: true,
                    description: true,
                    website: true,
                    github: true,
                    twitter: true,
                    createdAt: true,
                    updatedAt: true,
                    category: true,
                    fundingAmount: true,
                    awardDate: true,
                    xGovPeriod: true,
                    proposalLink: true,
                    teamId: true,
                    // Removed invalid fields
                },
            },
        },
    })

    return teams
}

export default async function TeamPage() {
    const session = await getSession()

    // If not logged in, redirect to login
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/team")
    }

    let teams = await getUserTeams(session.user.id)

    // Ensure the data structure matches the expected type
    teams = teams.map((team) => ({
        ...team,
        whitelistedAddresses: team.whitelistedAddresses.map((address) => ({
            ...address,
            createdAt: new Date(address.createdAt) as Date,
            updatedAt: new Date(address.updatedAt) as Date,
        })),
        members: team.members.map((member) => ({
            ...member,
            user: {
                ...member.user,
            },
        })),
    }))

    // If user has no teams, show a message
    if (teams.length === 0) {
        return (
            <div className="container px-4 md:px-6 py-8">
                <h1 className="text-3xl font-bold mb-6">Team Dashboard</h1>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">No Teams Found</h2>
                    <p className="text-muted-foreground mb-4">
                        You are not currently a member of any teams. To join a team, you need to claim a proposal or be added to a
                        team&apos;s whitelist.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            <TeamDashboard currentUserId={session.user.id} teams={teams} />
        </div>
    )
}

