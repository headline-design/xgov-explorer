import { PrismaClient } from "@prisma/client"

// Import directly from the file system paths instead of using Next.js aliases
import { proposals } from "../data/xgov-sessions"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting to seed proposals...")

  // Create teams first
  const uniqueTeams = [...new Set(proposals.map((p) => p.team))]

  for (const teamName of uniqueTeams) {
    console.log(`Creating or updating team: ${teamName}`)
    await prisma.team.upsert({
      where: { name: teamName },
      update: {},
      create: {
        name: teamName,
        description: `Team behind various xGov proposals`,
      },
    })
  }

  // Now create proposals
  for (const proposal of proposals) {
    console.log(`Processing proposal: ${proposal.title}`)

    try {
      const team = await prisma.team.findUnique({
        where: { name: proposal.team },
      })

      if (!team) {
        console.error(`Team not found for proposal: ${proposal.title}`)
        continue
      }

      await prisma.proposal.upsert({
        where: { id: proposal.id },
        update: {
          title: proposal.title,
          number: parseInt(proposal.number, 10),
          description: proposal.description,
          team: proposal.team,
          category: proposal.category,
          fundingAmount: proposal.fundingAmount,
          awardDate: new Date(proposal.awardDate),
          status: proposal.status,
          completionPercentage: proposal.completionPercentage,
          xGovPeriod: proposal.xGovPeriod,
          website: proposal.website,
          github: proposal.github,
          twitter: proposal.twitter,
          proposalLink: proposal.proposalLink,
        },
        create: {
          id: proposal.id,
          number: parseInt(proposal.number, 10),
          title: proposal.title,
          description: proposal.description,
          team: proposal.team,
          category: proposal.category,
          fundingAmount: proposal.fundingAmount,
          awardDate: new Date(proposal.awardDate),
          status: proposal.status,
          completionPercentage: proposal.completionPercentage,
          xGovPeriod: proposal.xGovPeriod,
          website: proposal.website || null,
          github: proposal.github || null,
          twitter: proposal.twitter || null,
          proposalLink: proposal.proposalLink || null,
          teamId: team.id,
        },
      })

      // Create milestones if they exist
      if (proposal.milestones && proposal.milestones.length > 0) {
        for (const milestone of proposal.milestones) {
          await prisma.milestone.create({
            data: {
              title: milestone.title,
              description: milestone.description,
              completed: milestone.completed,
              completedDate: milestone.completedDate ? new Date(milestone.completedDate) : null,
              proposalId: proposal.id,
            },
          })
        }
      }
    } catch (error) {
      console.error(`Error processing proposal ${proposal.title}:`, error)
    }
  }

  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

