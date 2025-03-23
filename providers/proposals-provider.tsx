"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { proposals as staticProposals } from "@/data/xgov-sessions"

// Define types for our proposal data
export interface Proposal {
  id: string
  number?: string
  title: string
  description: string
  team: string
  category: string
  fundingAmount: number
  awardDate?: string
  status: string
  completionPercentage: number
  xGovPeriod?: string
  website?: string
  github?: string
  twitter?: string
  proposalLink?: string
  claimed?: boolean
  teamId?: string
}

export interface UpdatedProposal {
  number: string
  id: string
  title: string
  team: string
  teamImage?: string
  updateType: "claimed" | "progress" | "status"
  updateDate: string // ISO date string
  updateDescription: string
  completionPercentage?: number
  category?: string
}

interface ProposalsContextType {
  proposals: Proposal[]
  featuredProposals: Proposal[]
  recentlyUpdatedProposals: UpdatedProposal[]
  loading: boolean
  error: string | null
  refreshProposals: () => Promise<void>
}

const ProposalsContext = createContext<ProposalsContextType | undefined>(undefined)

export function useProposals() {
  const context = useContext(ProposalsContext)
  if (context === undefined) {
    throw new Error("useProposals must be used within a ProposalsProvider")
  }
  return context
}

interface ProposalsProviderProps {
  children: ReactNode
  featuredIds?: string[]
}

export function ProposalsProvider({
  children,
  featuredIds = [
    "b27703ae-a303-4969-8f18-44c2e33cf973",
    "e9e5d945-9025-4dc4-b5a2-135c761fb937",
    "a37478f9-42b1-4215-a321-1f01c21a81f5",
  ],
}: ProposalsProviderProps) {
  const [proposals, setProposals] = useState<Proposal[]>(staticProposals)
  const [recentlyUpdatedProposals, setRecentlyUpdatedProposals] = useState<UpdatedProposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get featured proposals based on the provided IDs
  const featuredProposals = proposals
    .filter((proposal) => featuredIds.includes(proposal.id))
    .sort((a, b) => {
      const fundingA = a.fundingAmount || 0
      const fundingB = b.fundingAmount || 0
      return fundingA - fundingB
    })

  // Function to fetch recently updated proposals
  const fetchRecentlyUpdatedProposals = async () => {
    try {
      const response = await fetch("/api/proposals/recent")

      if (!response.ok) {
        throw new Error("Failed to fetch recently updated proposals")
      }

      const data = await response.json()
      setRecentlyUpdatedProposals(data)
    } catch (err) {
      console.error("Error fetching recently updated proposals:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")

      // Fallback to static data if API fails
      setRecentlyUpdatedProposals([])
    }
  }

  // Function to refresh all proposal data
  const refreshProposals = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real implementation, you would fetch the main proposals list here too
      // For now, we're just using the static data for the main list

      // Fetch recently updated proposals
      await fetchRecentlyUpdatedProposals()
    } catch (err) {
      console.error("Error refreshing proposals:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    refreshProposals()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    proposals,
    featuredProposals,
    recentlyUpdatedProposals,
    loading,
    error,
    refreshProposals,
  }

  return <ProposalsContext.Provider value={value}>{children}</ProposalsContext.Provider>
}

