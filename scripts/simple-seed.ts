import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

// Define the Project type directly in this file
interface Project {
  id: string
  title: string
  description: string
  team: string
  category: string
  fundingAmount: number
  awardDate: string
  status: "Completed" | "In Progress" | "Planning"
  completionPercentage: number
  xGovPeriod: string
  image: string
  website?: string
  github?: string
  twitter?: string
  proposalLink?: string
  milestones?: Milestone[]
}

interface Milestone {
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

// Load projects from a JSON file
async function loadProjects(): Promise<Project[]> {
  // Create a simple JSON file with just a few projects for testing
  const sampleProjects: Project[] = [
    {
      id: "sample-1",
      title: "Sample Project 1",
      description: "This is a sample project for testing the seed script",
      team: "Sample Team",
      category: "Tools",
      fundingAmount: 10000,
      awardDate: new Date().toISOString(),
      status: "Planning",
      completionPercentage: 0,
      xGovPeriod: "Session 1",
      image: "/placeholder.svg",
      milestones: [
        {
          title: "Planning Phase",
          description: "Define project scope and requirements",
          completed: false,
        },
      ],
    },
    {
      id: "sample-2",
      title: "Sample Project 2",
      description: "Another sample project for testing",
      team: "Another Team",
      category: "dApps",
      fundingAmount: 20000,
      awardDate: new Date().toISOString(),
      status: "In Progress",
      completionPercentage: 50,
      xGovPeriod: "Session 2",
      image: "/placeholder.svg",
      milestones: [
        {
          title: "Planning Phase",
          description: "Define project scope and requirements",
          completed: true,
          completedDate: new Date().toISOString(),
        },
        {
          title: "Implementation Phase",
          description: "Build the core functionality",
          completed: false,
        },
      ],
    },
  ]

  // Save to a JSON file for future use
  const filePath = path.join(__dirname, "sample-projects.json")
  fs.writeFileSync(filePath, JSON.stringify(sampleProjects, null, 2))

  return sampleProjects
}

async function main() {
  console.log("Starting to seed projects...")

  const projects = await loadProjects()
  console.log(`Loaded ${projects.length} sample projects`)

  // Create teams first
  const uniqueTeams = [...new Set(projects.map((p) => p.team))]

  for (const teamName of uniqueTeams) {
    console.log(`Creating or updating team: ${teamName}`)
    await prisma.team.upsert({
      where: { name: teamName },
      update: {},
      create: {
        name: teamName,
        description: `Team behind various xGov projects`,
      },
    })
  }

  // Now create projects
  for (const project of projects) {
    console.log(`Processing project: ${project.title}`)

    try {
      const team = await prisma.team.findUnique({
        where: { name: project.team },
      })

      if (!team) {
        console.error(`Team not found for project: ${project.title}`)
        continue
      }

      await prisma.proposal.upsert({
        where: { id: project.id },
        update: {
          title: project.title,
          description: project.description,
          team: project.team,
          category: project.category,
          fundingAmount: project.fundingAmount,
          awardDate: new Date(project.awardDate),
          status: project.status,
          completionPercentage: project.completionPercentage,
          xGovPeriod: project.xGovPeriod,
          website: project.website,
          github: project.github,
          twitter: project.twitter,
          proposalLink: project.proposalLink,
        },
        create: {
          id: project.id,
          title: project.title,
          description: project.description,
          team: project.team,
          category: project.category,
          fundingAmount: project.fundingAmount,
          awardDate: new Date(project.awardDate),
          status: project.status,
          completionPercentage: project.completionPercentage,
          xGovPeriod: project.xGovPeriod,
          website: project.website || null,
          github: project.github || null,
          twitter: project.twitter || null,
          proposalLink: project.proposalLink || null,
          teamId: team.id,
        },
      })

      // Create milestones if they exist
      if (project.milestones && project.milestones.length > 0) {
        for (const milestone of project.milestones) {
          await prisma.milestone.create({
            data: {
              title: milestone.title,
              description: milestone.description,
              completed: milestone.completed,
              completedDate: milestone.completedDate ? new Date(milestone.completedDate) : null,
              proposalId: project.id,
            },
          })
        }
      }
    } catch (error) {
      console.error(`Error processing project ${project.title}:`, error)
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

