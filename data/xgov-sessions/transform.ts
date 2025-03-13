import type { Project, Milestone } from "@/types/project"

// Define the structure of the raw session data
interface SessionData {
  id: string
  type: number
  title: string
  description: string
  informationUrl?: string
  start: string
  end: string
  voteGatingSnapshotCid: string
  questions: Question[]
}

interface Question {
  id: string
  prompt: string
  description: string
  options: Option[]
  metadata: {
    link: string
    category: string
    focus_area: string
    threshold: number
    ask: number
  }
}

interface Option {
  id: string
  label: string
}

// Extract team name from prompt
function extractTeamInfo(prompt: string): { title: string; team: string } {
  // Format is typically "#XX Title by Team"
  const regex = /^#\d+\s+(.+?)\s+by\s+(.+?)(?:\s*<.*>|\s*$$@.*$$|\s*$)/
  const match = prompt.match(regex)

  if (match && match.length >= 3) {
    return {
      title: match[1].trim(),
      team: match[2].trim(),
    }
  }

  // Fallback if regex doesn't match
  const parts = prompt.split(" by ")
  if (parts.length >= 2) {
    // Remove PR number from title
    const titleParts = parts[0].split(" ")
    titleParts.shift() // Remove the PR number part
    return {
      title: titleParts.join(" ").trim(),
      team: parts[1].trim(),
    }
  }

  return {
    title: prompt,
    team: "Unknown Team",
  }
}

// Generate a random image for the project based on its id
function generateProjectImage(id: string, title: string): string {
  // Use a placeholder image with the project id as a seed
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360

  return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title)}&bg=hsl(${hue},70%,80%)`
}

// Determine project status based on award date
function determineStatus(awardDate: string): "Completed" | "In Progress" | "Planning" {
  const now = new Date()
  const awarded = new Date(awardDate)
  const monthsSinceAward = (now.getFullYear() - awarded.getFullYear()) * 12 + now.getMonth() - awarded.getMonth()

  if (monthsSinceAward > 6) {
    return "Completed"
  } else if (monthsSinceAward > 2) {
    return "In Progress"
  } else {
    return "Planning"
  }
}

// Generate completion percentage based on status
function generateCompletionPercentage(status: "Completed" | "In Progress" | "Planning"): number {
  switch (status) {
    case "Completed":
      return 100
    case "In Progress":
      return Math.floor(Math.random() * 50) + 30 // 30-80%
    case "Planning":
      return Math.floor(Math.random() * 30) // 0-30%
  }
}

// Generate milestones based on project description
function generateMilestones(description: string, status: "Completed" | "In Progress" | "Planning"): Milestone[] {
  // Extract potential milestone content from description
  const features = description.match(/Feature \d+:.*?(?=Feature \d+:|$)/gs) || []
  const milestones: Milestone[] = []

  // If we found features, use them as milestones
  if (features.length > 0) {
    return features.map((feature, index) => {
      const title = feature.split("\n")[0].trim()
      const description = feature.split("\n").slice(1).join("\n").trim()

      // Determine if milestone is completed based on project status
      const completed = status === "Completed" || (status === "In Progress" && index < features.length / 2)

      return {
        title,
        description: description || "Implementation of this feature",
        completed,
        completedDate: completed
          ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      }
    })
  }

  // Otherwise, generate generic milestones
  const milestoneCount = Math.floor(Math.random() * 3) + 2 // 2-4 milestones

  for (let i = 0; i < milestoneCount; i++) {
    const milestone: Milestone = {
      title: i === 0 ? "Project Planning" : i === milestoneCount - 1 ? "Final Delivery" : `Phase ${i}`,
      description:
        i === 0
          ? "Define project scope and requirements"
          : i === milestoneCount - 1
            ? "Complete all deliverables and documentation"
            : `Implement core functionality for phase ${i}`,
      completed: status === "Completed" || (status === "In Progress" && i < milestoneCount / 2),
    }

    if (milestone.completed) {
      milestone.completedDate = new Date(Date.now() - (milestoneCount - i) * 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    milestones.push(milestone)
  }

  return milestones
}

// Extract GitHub username from team name if available
function extractGithubUsername(team: string): string | undefined {
  const regex = /$$@([^)]+)$$/
  const match = team.match(regex)

  if (match && match.length >= 2) {
    return match[1]
  }

  return undefined
}

// Transform a session's data into an array of Project objects
export function transformSession(sessionData: SessionData, sessionNumber: number): Project[] {
  // Skip mock proposals and abstain votes
  const filteredQuestions = sessionData.questions.filter((q) => {
    const isMock = q.prompt.toLowerCase().includes("mock proposal")
    const isAbstain = q.prompt.toLowerCase().includes("abstain")
    return !isMock && !isAbstain
  })

  return filteredQuestions.map((question) => {
    const { title, team } = extractTeamInfo(question.prompt)
    const githubUsername = extractGithubUsername(team)

    // Clean up team name by removing GitHub username if present
    const cleanTeam = team.replace(/\s*$$@.*?$$\s*/, "").trim()

    // Use the end date of the session as the award date
    const awardDate = new Date(sessionData.end).toISOString()

    // Determine project status based on award date
    const status = determineStatus(awardDate)

    // Generate completion percentage based on status
    const completionPercentage = generateCompletionPercentage(status)

    // Generate milestones based on description and status
    const milestones = generateMilestones(question.description, status)

    // Extract GitHub repo from the link if available
    const githubRepo = question.metadata.link.includes("github.com") ? question.metadata.link : undefined

    return {
      id: question.id,
      title,
      description: question.description,
      team: cleanTeam,
      category: question.metadata.category,
      fundingAmount: question.metadata.ask,
      awardDate,
      status,
      completionPercentage,
      xGovPeriod: `Session ${sessionNumber}`,
      image: generateProjectImage(question.id, title),
      website: undefined, // Not available in the data
      github: githubUsername ? `https://github.com/${githubUsername}` : githubRepo,
      twitter: undefined, // Not available in the data
      proposalLink: question.metadata.link,
      milestones,
    }
  })
}

// Group projects by team/creator
export function groupProjectsByTeam(projects: Project[]): Record<string, Project[]> {
  const groupedProjects: Record<string, Project[]> = {}

  projects.forEach((project) => {
    // Normalize team name to handle slight variations
    const normalizedTeam = project.team.toLowerCase().trim()

    if (!groupedProjects[normalizedTeam]) {
      groupedProjects[normalizedTeam] = []
    }

    groupedProjects[normalizedTeam].push(project)
  })

  return groupedProjects
}

// Get unique teams with their projects
export function getUniqueTeams(projects: Project[]): { team: string; projects: Project[] }[] {
  const groupedProjects = groupProjectsByTeam(projects)

  return Object.entries(groupedProjects)
    .map(([normalizedTeam, teamProjects]) => {
      // Use the most recent team name as the display name
      const displayTeam = teamProjects.sort(
        (a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime(),
      )[0].team

      return {
        team: displayTeam,
        projects: teamProjects,
      }
    })
    .sort((a, b) => b.projects.length - a.projects.length) // Sort by number of projects
}

