"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { session1Proposals, session2Proposals, session3Proposals, session4Proposals } from "@/data/xgov-sessions"

export function VotingTrends() {
  // Calculate statistics for each session
  const sessions = [
    {
      name: "Session 1",
      period: "Jul-Aug 2023",
      proposals: session1Proposals,
      passed: session1Proposals.filter((p) => p.voteResult?.passed).length,
      failed: session1Proposals.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session1Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
      totalAvailable: 2000000, // 2M ALGO
    },
    {
      name: "Session 2",
      period: "Nov-Dec 2023",
      proposals: session2Proposals,
      passed: session2Proposals.filter((p) => p.voteResult?.passed).length,
      failed: session2Proposals.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session2Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
      totalAvailable: 1946000, // 1.946M ALGO
    },
    {
      name: "Session 3",
      period: "Feb-Mar 2024",
      proposals: session3Proposals,
      passed: session3Proposals.filter((p) => p.voteResult?.passed).length,
      failed: session3Proposals.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session3Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
      totalAvailable: 2000000, // 2M ALGO
    },
    {
      name: "Session 4",
      period: "May-Jun 2024",
      proposals: session4Proposals,
      passed: session4Proposals.filter((p) => p.voteResult?.passed).length,
      failed: session4Proposals.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session4Proposals.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
      totalAvailable: 2000000, // 2M ALGO
    },
  ]

  // Calculate the maximum values for scaling
  const maxProposals = Math.max(...sessions.map((s) => s.proposals.length))
  const maxFunding = Math.max(...sessions.map((s) => s.totalFunding))

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">xGov Program Growth</h2>
          <p className="text-muted-foreground max-w-[700px]">
            See how the xGov program has evolved across all voting sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Proposals by Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sessions.map((session) => (
                  <div key={session.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {session.name} ({session.period})
                      </span>
                      <span>{session.proposals.length} proposals</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${(session.passed / maxProposals) * 100}%` }}
                      />
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${(session.failed / maxProposals) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{session.passed} passed</span>
                      <span>{session.failed} failed</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funding Awarded by Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sessions.map((session) => (
                  <div key={session.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {session.name} ({session.period})
                      </span>
                      <span>
                        {session.totalFunding.toLocaleString()} / {session.totalAvailable.toLocaleString()} ALGO
                      </span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${(session.totalFunding / session.totalAvailable) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{session.passed} funded proposals</span>
                      <span>
                        {Math.round((session.totalFunding / session.totalAvailable) * 100)}% of available funds
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Total funding across all sessions:{" "}
                  {sessions.reduce((sum, s) => sum + s.totalFunding, 0).toLocaleString()} ALGO (
                  {Math.round(
                    (sessions.reduce((sum, s) => sum + s.totalFunding, 0) /
                      sessions.reduce((sum, s) => sum + s.totalAvailable, 0)) *
                      100,
                  )}
                  % of available funds)
                </li>
                <li>
                  Overall pass rate:{" "}
                  {(
                    (sessions.reduce((sum, s) => sum + s.passed, 0) /
                      sessions.reduce((sum, s) => sum + s.proposals.length, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </li>
                <li>
                  Most competitive session:{" "}
                  {sessions.sort((a, b) => b.proposals.length / b.passed - a.proposals.length / a.passed)[0].name}
                  with{" "}
                  {
                    sessions.sort((a, b) => b.proposals.length / b.passed - a.proposals.length / a.passed)[0].proposals
                      .length
                  }{" "}
                  proposals competing for{" "}
                  {sessions.sort((a, b) => b.proposals.length / b.passed - a.proposals.length / a.passed)[0].passed} spots
                </li>
                <li>
                  Highest funded session: {sessions.sort((a, b) => b.totalFunding - a.totalFunding)[0].name}
                  with {sessions.sort((a, b) => b.totalFunding - a.totalFunding)[0].totalFunding.toLocaleString()} ALGO
                  awarded
                </li>
                <li>
                  Average funding per proposal:{" "}
                  {Math.round(
                    sessions.reduce((sum, s) => sum + s.totalFunding, 0) /
                      sessions.reduce((sum, s) => sum + s.passed, 0),
                  ).toLocaleString()}{" "}
                  ALGO
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

