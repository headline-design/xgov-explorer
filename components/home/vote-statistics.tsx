"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"
import { session1Proposals, session2Proposals, session3Proposals, session4Proposals } from "@/data/xgov-sessions"

export function VoteStatistics() {
  const [selectedPeriod, setSelectedPeriod] = useState("session4")

  // Calculate statistics for each session
  const session1Stats = {
    total: session1Proposals.length,
    passed: session1Proposals.filter((p) => p.voteResult?.passed).length,
    failed: session1Proposals.filter((p) => p.voteResult?.passed === false).length,
    noVote: session1Proposals.filter((p) => !p.voteResult).length,
    passRate:
      (session1Proposals.filter((p) => p.voteResult?.passed).length /
        Math.max(1, session1Proposals.filter((p) => p.voteResult).length)) *
      100,
    totalFunding: session1Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
  }

  const session2Stats = {
    total: session2Proposals.length,
    passed: session2Proposals.filter((p) => p.voteResult?.passed).length,
    failed: session2Proposals.filter((p) => p.voteResult?.passed === false).length,
    noVote: session2Proposals.filter((p) => !p.voteResult).length,
    passRate:
      (session2Proposals.filter((p) => p.voteResult?.passed).length /
        Math.max(1, session2Proposals.filter((p) => p.voteResult).length)) *
      100,
    totalFunding: session2Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
  }

  const session3Stats = {
    total: session3Proposals.length,
    passed: session3Proposals.filter((p) => p.voteResult?.passed).length,
    failed: session3Proposals.filter((p) => p.voteResult?.passed === false).length,
    noVote: session3Proposals.filter((p) => !p.voteResult).length,
    passRate:
      (session3Proposals.filter((p) => p.voteResult?.passed).length /
        Math.max(1, session3Proposals.filter((p) => p.voteResult).length)) *
      100,
    totalFunding: session3Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
  }

  const session4Stats = {
    total: session4Proposals.length,
    passed: session4Proposals.filter((p) => p.voteResult?.passed).length,
    failed: session4Proposals.filter((p) => p.voteResult?.passed === false).length,
    noVote: session4Proposals.filter((p) => !p.voteResult).length,
    passRate:
      (session4Proposals.filter((p) => p.voteResult?.passed).length /
        Math.max(1, session4Proposals.filter((p) => p.voteResult).length)) *
      100,
    totalFunding: session4Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
  }

  // Get current stats based on selected period
  const statsMap = {
    session1: session1Stats,
    session2: session2Stats,
    session3: session3Stats,
    session4: session4Stats,
  }

  const stats = statsMap[selectedPeriod as keyof typeof statsMap]

  return (
    <section className="w-full py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">xGov Voting Results</h2>
          <p className="text-muted-foreground max-w-[700px]">
            Explore the voting results from all xGov sessions. See which proposals passed and which didn&apos;t make the cut.
          </p>

          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="mt-6">
            <TabsList className="grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="session1"><span className="hidden sm:block">Session 1</span><span className="block sm:hidden">S1</span></TabsTrigger>
              <TabsTrigger value="session2"><span className="hidden sm:block">Session 2</span><span className="block sm:hidden">S2</span></TabsTrigger>
              <TabsTrigger value="session3"><span className="hidden sm:block">Session 3</span><span className="block sm:hidden">S3</span></TabsTrigger>
              <TabsTrigger value="session4"><span className="hidden sm:block">Session 4</span><span className="block sm:hidden">S4</span></TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Add period dates */}
          <p className="text-xs text-muted-foreground mt-3">
            {selectedPeriod === "session1" && "July-August 2023"}
            {selectedPeriod === "session2" && "November-December 2023"}
            {selectedPeriod === "session3" && "February-March 2024"}
            {selectedPeriod === "session4" && "May-June 2024"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground mt-1">{stats.totalFunding.toLocaleString()} ALGO awarded</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 dark:border-green-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Passed Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.passed}</div>
              <p className="text-sm text-muted-foreground mt-1">{stats.passRate.toFixed(1)}% pass rate</p>
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                Failed Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.failed}</div>
              <p className="text-sm text-muted-foreground mt-1">{(100 - stats.passRate).toFixed(1)}% fail rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                {stats.noVote > 0 ? (
                  <>
                    <HelpCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    No Vote Data
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Data Completeness
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.noVote > 0 ? stats.noVote : "100%"}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.noVote > 0 ? "Missing vote information" : "All vote data successfully ingested"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

