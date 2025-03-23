import { Proposal as PrismaProposal } from "@prisma/client"

export interface Milestone {
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

export interface VoteResult {
  votesReceived: number
  votesNeeded: number
  passed: boolean
}

export interface Proposal {
  id: string
  number: string
  title: string
  description: string
  longDescription?: string
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
  voteResult?: VoteResult
}

export interface ExtendedProposal extends PrismaProposal {
  id: string
  title: string
  description: string
  longDescription?: string
  team: string
  category: string
  fundingAmount: number
  status: "Completed" | "In Progress" | "Planning"
  completionPercentage: number
  xGovPeriod: string
  image: string
  milestones?: Milestone[]
  voteResult?: VoteResult
}



