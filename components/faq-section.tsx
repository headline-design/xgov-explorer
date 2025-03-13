"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItemProps {
  question: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FaqItem({ question, children, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b last:border-b-0 dark:border-border">
      <h3>
        <button
          className="flex w-full items-center justify-between py-5 px-4 md:px-6 text-left font-medium transition-all hover:text-primary focus-visible:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-base md:text-lg">{question}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ml-4",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h3>
      <div
        className={cn(
          "grid text-sm md:text-base text-muted-foreground",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden px-4 md:px-6 pb-5">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10" id="faq">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[850px] space-y-10 md:space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
              Learn more about the Algorand Foundation xGov program and how it supports innovation in the Algorand
              ecosystem.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold px-1">About xGov</h3>
              <div className="divide-y rounded-xl border bg-card shadow-sm dark:shadow-md dark:shadow-primary/5 dark:divide-border">
                <FaqItem question="What is the Algorand xGov program?" defaultOpen={true}>
                  <p className="mb-4">
                    The Algorand xGov program is a community governance initiative launched by the Algorand Foundation
                    to empower the Algorand community to propose, fund, and build projects that enhance the Algorand
                    ecosystem.
                  </p>
                  <p>
                    Through xGov, community members can submit proposals for projects that address specific needs or
                    opportunities within the ecosystem. These proposals are then voted on by the community, and
                    successful proposals receive funding from the Algorand Foundation to bring their ideas to life.
                  </p>
                  <p className="mt-4">
                    Learn more on the{" "}
                    <Link
                      href="https://algorand.foundation/xgov"
                      target="_blank"
                      className="text-primary underline underline-offset-4"
                    >
                      official xGov page
                    </Link>
                    .
                  </p>
                </FaqItem>

                <FaqItem question="How does xGov differ from regular Algorand Governance?">
                  <p className="mb-4">
                    While regular Algorand Governance focuses on protocol-level decisions and rewards ALGO holders for
                    participating in governance votes, xGov is specifically designed to fund and support
                    community-driven development projects.
                  </p>
                  <p>
                    xGov complements the main governance program by providing a structured framework for community
                    members to propose and execute projects that contribute to the growth and development of the
                    Algorand ecosystem, with direct funding from the Algorand Foundation.
                  </p>
                </FaqItem>

                <FaqItem question="When did the xGov program start?">
                  <p>
                    The Algorand xGov program was introduced in late 2022 and officially launched in early 2023. It was
                    designed as part of the Algorand Foundation&apos;s commitment to decentralizing governance and empowering
                    the community to play a more active role in shaping the future of the Algorand ecosystem.
                  </p>
                </FaqItem>

                <FaqItem question="What types of projects are funded through xGov?">
                  <p className="mb-4">
                    The xGov program funds a diverse range of projects that contribute to the Algorand ecosystem,
                    including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>DeFi protocols and applications</li>
                    <li>NFT marketplaces and tools</li>
                    <li>Governance solutions</li>
                    <li>Developer tools and infrastructure</li>
                    <li>Educational resources and community initiatives</li>
                    <li>Interoperability solutions</li>
                    <li>Gaming and metaverse projects</li>
                    <li>Real-world asset tokenization</li>
                  </ul>
                </FaqItem>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold px-1">Participation & Funding</h3>
              <div className="divide-y rounded-xl border bg-card shadow-sm dark:shadow-md dark:shadow-primary/5 dark:divide-border">
                <FaqItem question="How can I submit a proposal to xGov?">
                  <p className="mb-4">
                    To submit a proposal to the xGov program, you need to follow these general steps:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Review the current xGov period guidelines and requirements</li>
                    <li>Draft a detailed proposal following the required template</li>
                    <li>Submit your proposal through the official Algorand Foundation forum</li>
                    <li>Engage with community feedback and questions</li>
                    <li>If selected, prepare for community voting</li>
                  </ol>
                  <p className="mt-4">
                    Detailed instructions and templates can be found on the{" "}
                    <Link
                      href="https://algorand.foundation/xgov"
                      target="_blank"
                      className="text-primary underline underline-offset-4"
                    >
                      Algorand Foundation website
                    </Link>
                    .
                  </p>
                </FaqItem>

                <FaqItem question="What is the typical funding amount for xGov projects?">
                  <p className="mb-4">
                    Funding amounts for xGov projects vary widely depending on the scope, complexity, and potential
                    impact of the proposed project. Typically, projects can receive anywhere from 10,000 to 500,000 ALGO
                    or more.
                  </p>
                  <p>
                    The Algorand Foundation allocates a specific budget for each xGov period, and this budget is
                    distributed among the approved proposals based on community voting and the Foundation&apos;s assessment
                    of each project&apos;s value proposition.
                  </p>
                </FaqItem>

                <FaqItem question="How are xGov proposals evaluated and selected?">
                  <p className="mb-4">xGov proposals go through a multi-stage evaluation process:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Initial screening by the Algorand Foundation to ensure proposals meet basic requirements</li>
                    <li>Community discussion and feedback period</li>
                    <li>Refinement of proposals based on feedback</li>
                    <li>Community voting by Algorand Governors</li>
                    <li>Final selection based on voting results and available funding</li>
                  </ol>
                  <p className="mt-4">
                    Proposals are evaluated based on factors such as technical feasibility, team qualifications,
                    potential impact on the ecosystem, alignment with Algorand&apos;s goals, and community support.
                  </p>
                </FaqItem>

                <FaqItem question="What are xGov periods?">
                  <p>
                    xGov periods are specific timeframes during which proposals can be submitted, evaluated, and funded.
                    Each period typically lasts for several months and has its own budget allocation and potentially
                    different focus areas or priorities. The Algorand Foundation announces the start of each new xGov
                    period, along with any specific guidelines or themes for that period.
                  </p>
                </FaqItem>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold px-1">Technical & Implementation</h3>
              <div className="divide-y rounded-xl border bg-card shadow-sm dark:shadow-md dark:shadow-primary/5 dark:divide-border">
                <FaqItem question="Do xGov projects need to be built exclusively on Algorand?">
                  <p>
                    Yes, xGov projects must be built on the Algorand blockchain or directly contribute to the Algorand
                    ecosystem. The primary goal of the xGov program is to foster growth and innovation within the
                    Algorand ecosystem, so funded projects should leverage Algorand&apos;s technology and contribute to its
                    adoption and development.
                  </p>
                </FaqItem>

                <FaqItem question="What technical resources are available for xGov developers?">
                  <p className="mb-4">
                    Developers working on xGov projects have access to a wide range of technical resources, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <Link
                        href="https://developer.algorand.org/"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Developer Portal
                      </Link>{" "}
                      with comprehensive documentation
                    </li>
                    <li>
                      <Link
                        href="https://github.com/algorand"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand GitHub repositories
                      </Link>{" "}
                      with open-source code and examples
                    </li>
                    <li>
                      <Link
                        href="https://discord.gg/algorand"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Discord community
                      </Link>{" "}
                      for technical support
                    </li>
                    <li>SDKs for various programming languages (Python, JavaScript, Go, Java, etc.)</li>
                    <li>Technical mentorship from Algorand Foundation team members</li>
                    <li>Testnet and development environment access</li>
                  </ul>
                </FaqItem>

                <FaqItem question="How are milestones and deliverables tracked for funded projects?">
                  <p className="mb-4">Funded xGov projects typically follow a milestone-based approach:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Projects define clear milestones and deliverables in their proposals</li>
                    <li>Funding is often released in tranches tied to milestone completion</li>
                    <li>Regular progress updates are required to be shared with the community</li>
                    <li>The Algorand Foundation monitors progress and provides support as needed</li>
                    <li>Final deliverables are evaluated against the original proposal</li>
                  </ol>
                  <p className="mt-4">
                    This structured approach ensures accountability and increases the likelihood of successful project
                    completion.
                  </p>
                </FaqItem>

                <FaqItem question="Can existing projects apply for xGov funding?">
                  <p>
                    Yes, existing projects can apply for xGov funding to expand their features, improve their
                    infrastructure, or address specific needs within the Algorand ecosystem. In fact, many successful
                    xGov proposals come from teams that have already demonstrated their capabilities through existing
                    projects. These teams can leverage their experience and track record to strengthen their proposals.
                  </p>
                </FaqItem>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold px-1">Community & Support</h3>
              <div className="divide-y rounded-xl border bg-card shadow-sm dark:shadow-md dark:shadow-primary/5 dark:divide-border">
                <FaqItem question="How can I get involved with xGov without submitting a proposal?">
                  <p className="mb-4">
                    There are many ways to get involved with the xGov program without submitting your own proposal:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participate in community discussions about submitted proposals</li>
                    <li>Vote on proposals if you&apos;re an Algorand Governor</li>
                    <li>Offer technical expertise or feedback to proposal teams</li>
                    <li>Collaborate with existing teams on their proposals</li>
                    <li>Help test and provide feedback on developed projects</li>
                    <li>Spread awareness about successful xGov projects</li>
                  </ul>
                </FaqItem>

                <FaqItem question="Where can I find more information about xGov?">
                  <p className="mb-4">
                    You can find more information about the xGov program through these official channels:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <Link
                        href="https://algorand.foundation/xgov"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Foundation xGov Page
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://forum.algorand.org/"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Foundation Forum
                      </Link>{" "}
                      (xGov section)
                    </li>
                    <li>
                      <Link
                        href="https://www.youtube.com/c/AlgorandFoundation"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Foundation YouTube Channel
                      </Link>{" "}
                      for webinars and updates
                    </li>
                    <li>
                      <Link
                        href="https://twitter.com/AlgoFoundation"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Foundation Twitter
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://discord.gg/algorand"
                        target="_blank"
                        className="text-primary underline underline-offset-4"
                      >
                        Algorand Discord
                      </Link>
                    </li>
                  </ul>
                </FaqItem>

                <FaqItem question="How does xGov contribute to Algorand's ecosystem growth?">
                  <p className="mb-4">
                    The xGov program contributes to Algorand&apos;s ecosystem growth in several key ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Funding innovative projects that address gaps in the ecosystem</li>
                    <li>Attracting talented developers and teams to build on Algorand</li>
                    <li>Encouraging community participation in governance and development</li>
                    <li>Creating a pipeline of high-quality applications and tools</li>
                    <li>Fostering collaboration between different projects and teams</li>
                    <li>Accelerating the development of critical infrastructure</li>
                    <li>Supporting education and onboarding initiatives</li>
                  </ul>
                  <p className="mt-4">
                    By empowering the community to identify needs and develop solutions, xGov helps ensure that the
                    Algorand ecosystem evolves in a way that truly serves its users and stakeholders.
                  </p>
                </FaqItem>

                <FaqItem question="Can international teams apply for xGov funding?">
                  <p>
                    Yes, the xGov program is open to teams and individuals from around the world. The Algorand ecosystem
                    is global, and the xGov program aims to support innovation regardless of geographic location.
                    International teams have successfully received funding through the program, contributing to the
                    diverse and global nature of the Algorand community.
                  </p>
                </FaqItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

