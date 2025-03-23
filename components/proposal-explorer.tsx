"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProposalDetailView } from "@/components/proposal-detail-view"
import { ProposalCard } from "@/components/proposal-card"
import { ProposalListItem } from "@/components/proposal-list-item"
import { Search, Filter, ArrowUpDown, CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import {
  proposals,
  session1Proposals,
  session2Proposals,
  session3Proposals,
  session4Proposals,
} from "@/data/xgov-sessions"
import type { Proposal } from "@/types/proposal"
import DialogV2 from "./ui/dialog-v2/dialog-v2"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/lib/hooks/use-debounce"

export function ProposalExplorer() {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedVoteStatus, setSelectedVoteStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  // State for UI
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Debounce search query to prevent excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Extract unique categories from proposals
  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(proposals.map((proposal) => proposal.category)))].sort()
  }, [])

  // Define periods
  const periods = [
    { value: "all", label: "All Periods" },
    { value: "period1", label: "Period 1 (Jul-Aug 2023)" },
    { value: "period2", label: "Period 2 (Nov-Dec 2023)" },
    { value: "period3", label: "Period 3 (Feb-Mar 2024)" },
    { value: "period4", label: "Period 4 (May-Jun 2024)" },
  ]

  // Define vote status options
  const voteStatuses = [
    { value: "all", label: "All Proposals" },
    { value: "passed", label: "Passed Proposals" },
    { value: "failed", label: "Failed Proposals" },
    { value: "no-vote", label: "No Vote Data" },
  ]

  // Define items per page options
  const itemsPerPageOptions = [
    { value: 12, label: "12 per page" },
    { value: 24, label: "24 per page" },
    { value: 48, label: "48 per page" },
    { value: 96, label: "96 per page" },
  ]

  // Filter and sort proposals
  const filterAndSortProposals = useCallback(() => {
    setIsLoading(true)

    // Use setTimeout to prevent UI freezing during filtering
    setTimeout(() => {
      try {
        // First, select proposals by period
        let periodProposals: Proposal[] = proposals
        if (selectedPeriod === "period1") {
          periodProposals = session1Proposals
        } else if (selectedPeriod === "period2") {
          periodProposals = session2Proposals
        } else if (selectedPeriod === "period3") {
          periodProposals = session3Proposals
        } else if (selectedPeriod === "period4") {
          periodProposals = session4Proposals
        }

        let result = [...periodProposals]

        // Filter by search query
        if (debouncedSearchQuery) {
          const query = debouncedSearchQuery.toLowerCase()
          result = result.filter(
            (proposal) =>
              proposal.title.toLowerCase().includes(query) ||
              proposal.description.toLowerCase().includes(query) ||
              proposal.team.toLowerCase().includes(query),
          )
        }

        // Filter by category
        if (selectedCategory !== "all") {
          result = result.filter((proposal) => proposal.category === selectedCategory)
        }

        // Filter by vote status
        if (selectedVoteStatus !== "all") {
          if (selectedVoteStatus === "passed") {
            result = result.filter((proposal) => proposal.voteResult?.passed === true)
          } else if (selectedVoteStatus === "failed") {
            result = result.filter((proposal) => proposal.voteResult?.passed === false)
          } else if (selectedVoteStatus === "no-vote") {
            result = result.filter((proposal) => !proposal.voteResult)
          }
        }

        // Sort proposals
        if (sortBy === "newest") {
          result = result.sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())
        } else if (sortBy === "oldest") {
          result = result.sort((a, b) => new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime())
        } else if (sortBy === "fundingHighToLow") {
          result = result.sort((a, b) => b.fundingAmount - a.fundingAmount)
        } else if (sortBy === "fundingLowToHigh") {
          result = result.sort((a, b) => a.fundingAmount - b.fundingAmount)
        } else if (sortBy === "alphabetical") {
          result = result.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortBy === "voteMargin") {
          // Sort by vote margin (votes received - votes needed) for proposals with vote data
          result = result.sort((a, b) => {
            const marginA = a.voteResult
              ? a.voteResult.votesReceived - a.voteResult.votesNeeded
              : Number.NEGATIVE_INFINITY
            const marginB = b.voteResult
              ? b.voteResult.votesReceived - b.voteResult.votesNeeded
              : Number.NEGATIVE_INFINITY
            return marginB - marginA
          })
        }

        setFilteredProposals(result)
        // Reset to first page when filters change
        setCurrentPage(1)
      } catch (error) {
        console.error("Error filtering proposals:", error)
      } finally {
        setIsLoading(false)
      }
    }, 0)
  }, [debouncedSearchQuery, selectedCategory, selectedPeriod, selectedVoteStatus, sortBy])

  // Apply filters when dependencies change
  useEffect(() => {
    filterAndSortProposals()
  }, [filterAndSortProposals])

  // Handle proposal click
  const handleProposalClick = useCallback((proposal: Proposal) => {
    setSelectedProposal(proposal)
    setIsDialogOpen(true)
  }, [])

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedPeriod("all")
    setSelectedVoteStatus("all")
    setSortBy("newest")
    setCurrentPage(1)
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage)
  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProposals.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProposals, currentPage, itemsPerPage])

  // Calculate vote statistics
  const voteStats = useMemo(
    () => ({
      total: filteredProposals.length,
      passed: filteredProposals.filter((p) => p.voteResult?.passed).length,
      failed: filteredProposals.filter((p) => p.voteResult?.passed === false).length,
      noVote: filteredProposals.filter((p) => !p.voteResult).length,
    }),
    [filteredProposals],
  )


  // Generate pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pageNumbers: number[] = []
    const maxPageButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="flex items-center justify-center mt-8 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronLeft className="h-4 w-4" />
          <ChevronLeft className="h-4 w-4 -ml-2" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(1)}
              aria-label="Page 1"
            >
              1
            </Button>
            {startPage > 2 && <span className="mx-1">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentPage(number)}
            aria-label={`Page ${number}`}
            aria-current={currentPage === number ? "page" : undefined}
          >
            {number}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-1">...</span>}
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              aria-label={`Page ${totalPages}`}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronRight className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 -ml-2" />
        </Button>
      </div>
    )
  }

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))
  }

  return (
    <section className="w-full py-6 md:py-12" id="proposals">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">xGov Award Winners</h2>
              <p className="text-muted-foreground">
                Browse through proposals that have received funding through the Algorand Foundation xGov program.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>

              <Select value={viewMode} onValueChange={(value: "grid" | "list") => setViewMode(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="View mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={`flex flex-col gap-4 my-6 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search proposals..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search proposals"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedVoteStatus} onValueChange={setSelectedVoteStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vote Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {voteStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="fundingHighToLow">Funding: High to Low</SelectItem>
                    <SelectItem value="fundingLowToHigh">Funding: Low to High</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="voteMargin">Vote Margin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center">
                <RotateCcw className="h-3 w-3 mr-2" />
                Reset Filters
              </Button>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vote statistics */}
          {(selectedPeriod === "period3" || selectedPeriod === "period4") && (
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="font-medium">{voteStats.total} proposals</span>
              </div>
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Passed:</span>
                <span className="font-medium">{voteStats.passed} proposals</span>
                <span className="text-xs text-muted-foreground">
                  ({voteStats.total > 0 ? Math.round((voteStats.passed / voteStats.total) * 100) : 0}%)
                </span>
              </div>
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-muted-foreground">Failed:</span>
                <span className="font-medium">{voteStats.failed} proposals</span>
                <span className="text-xs text-muted-foreground">
                  ({voteStats.total > 0 ? Math.round((voteStats.failed / voteStats.total) * 100) : 0}%)
                </span>
              </div>
              {voteStats.noVote > 0 && (
                <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">No Vote Data:</span>
                  <span className="font-medium">{voteStats.noVote} proposals</span>
                  <span className="text-xs text-muted-foreground">
                    ({voteStats.total > 0 ? Math.round((voteStats.noVote / voteStats.total) * 100) : 0}%)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Results summary */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProposals.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredProposals.length)} of {filteredProposals.length} proposals
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => setSelectedCategory("all")}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedPeriod !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {periods.find((p) => p.value === selectedPeriod)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => setSelectedPeriod("all")}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedVoteStatus !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {voteStatuses.find((s) => s.value === selectedVoteStatus)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => setSelectedVoteStatus("all")}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: "{searchQuery}"
                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => setSearchQuery("")}>
                    <XCircle className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {renderSkeletons()}
            </div>
          ) : filteredProposals.length > 0 ? (
            <>
              {/* Grid view */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} onClick={handleProposalClick} />
                  ))}
                </div>
              )}

              {/* List view */}
              {viewMode === "list" && (
                <div className="space-y-4">
                  {paginatedProposals.map((proposal) => (
                    <ProposalListItem key={proposal.id} proposal={proposal} onClick={handleProposalClick} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {renderPagination()}
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground mb-4">No proposals found matching your criteria.</p>
              <Button variant="outline" onClick={resetFilters} className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Proposal detail dialog */}
      <DialogV2 showModal={isDialogOpen} setShowModal={setIsDialogOpen}>
        {selectedProposal && (
          <ProposalDetailView proposal={selectedProposal} closeModal={() => setIsDialogOpen(false)} />
        )}
      </DialogV2>
    </section>
  )
}

