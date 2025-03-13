"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { session1Projects, session2Projects, session3Projects, session4Projects } from "@/data/xgov-sessions"

export function VotingTrends() {
  // Calculate statistics for each session
  const sessions = [
    {
      name: "Session 1",
      period: "Jul-Aug 2023",
      projects: session1Projects,
      passed: session1Projects.filter((p) => p.voteResult?.passed).length,
      failed: session1Projects.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session1Projects.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
    },
    {
      name: "Session 2",
      period: "Nov-Dec 2023",
      projects: session2Projects,
      passed: session2Projects.filter((p) => p.voteResult?.passed).length,
      failed: session2Projects.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session2Projects.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
    },
    {
      name: "Session 3",
      period: "Feb-Mar 2024",
      projects: session3Projects,
      passed: session3Projects.filter((p) => p.voteResult?.passed).length,
      failed: session3Projects.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session3Projects.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
    },
    {
      name: "Session 4",
      period: "May-Jun 2024",
      projects: session4Projects,
      passed: session4Projects.filter((p) => p.voteResult?.passed).length,
      failed: session4Projects.filter((p) => p.voteResult?.passed === false).length,
      totalFunding: session4Projects.filter((p) => p.voteResult?.passed).reduce((sum, p) => sum + p.fundingAmount, 0),
    },
  ]

  // Calculate the maximum values for scaling
  const maxProposals = Math.max(...sessions.map((s) => s.projects.length))
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
                      <span>{session.projects.length} proposals</span>
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
                      <span>{session.totalFunding.toLocaleString()} ALGO</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${(session.totalFunding / maxFunding) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{session.passed} funded projects</span>
                      <span>{(session.totalFunding / session.passed).toLocaleString()} ALGO avg per project</span>
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
                  {sessions.reduce((sum, s) => sum + s.totalFunding, 0).toLocaleString()} ALGO
                </li>
                <li>
                  Overall pass rate:{" "}
                  {(
                    (sessions.reduce((sum, s) => sum + s.passed, 0) /
                      sessions.reduce((sum, s) => sum + s.projects.length, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </li>
                <li>
                  Most competitive session:{" "}
                  {sessions.sort((a, b) => b.projects.length / b.passed - a.projects.length / a.passed)[0].name}
                  with{" "}
                  {
                    sessions.sort((a, b) => b.projects.length / b.passed - a.projects.length / a.passed)[0].projects
                      .length
                  }{" "}
                  proposals competing for{" "}
                  {sessions.sort((a, b) => b.projects.length / b.passed - a.projects.length / a.passed)[0].passed} spots
                </li>
                <li>
                  Highest funded session: {sessions.sort((a, b) => b.totalFunding - a.totalFunding)[0].name}
                  with {sessions.sort((a, b) => b.totalFunding - a.totalFunding)[0].totalFunding.toLocaleString()} ALGO
                  awarded
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

