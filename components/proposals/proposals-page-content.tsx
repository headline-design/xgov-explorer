"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, ArrowRight, Github, Globe, Twitter, CheckCircle, Clock, Loader2 } from "lucide-react"
import { useProposals, type Proposal } from "@/providers/proposals-provider"

export function ProposalsPageContent() {
    const { proposals, loading, error } = useProposals()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([])
    const [completionRange, setCompletionRange] = useState<[number, number]>([0, 100])
    const [sortBy, setSortBy] = useState<string>("newest")

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    // Get unique categories and statuses for filters
    const categories = [...new Set(proposals.map((p) => p.category))].filter(Boolean).sort()
    const statuses = [...new Set(proposals.map((p) => p.status))].filter(Boolean).sort()

    // Apply filters and search
    const filteredProposals = proposals.filter((proposal) => {
        // Search query filter
        if (
            searchQuery &&
            !proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !proposal.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !proposal.team.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false
        }

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(proposal.category)) {
            return false
        }

        // Status filter
        if (selectedStatus.length > 0 && !selectedStatus.includes(proposal.status)) {
            return false
        }

        // Completion range filter
        if (proposal.completionPercentage < completionRange[0] || proposal.completionPercentage > completionRange[1]) {
            return false
        }

        return true
    })

    // Sort proposals
    const sortedProposals = [...filteredProposals].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.awardDate || "").getTime() - new Date(a.awardDate || "").getTime()
            case "oldest":
                return new Date(a.awardDate || "").getTime() - new Date(b.awardDate || "").getTime()
            case "title-asc":
                return a.title.localeCompare(b.title)
            case "title-desc":
                return b.title.localeCompare(a.title)
            case "funding-high":
                return (b.fundingAmount || 0) - (a.fundingAmount || 0)
            case "funding-low":
                return (a.fundingAmount || 0) - (b.fundingAmount || 0)
            case "completion-high":
                return b.completionPercentage - a.completionPercentage
            case "completion-low":
                return a.completionPercentage - b.completionPercentage
            default:
                return 0
        }
    })

    // Paginate proposals
    const totalPages = Math.ceil(sortedProposals.length / itemsPerPage)
    const paginatedProposals = sortedProposals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories, selectedStatus, completionRange, sortBy])

    // Handle search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    // Handle category selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }

    // Handle status selection
    const handleStatusChange = (status: string) => {
        setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
    }

    // Handle completion range change
    const handleCompletionRangeChange = (value: number[]) => {
        setCompletionRange([value[0], value[1]])
    }

    // Handle sort change
    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategories([])
        setSelectedStatus([])
        setCompletionRange([0, 100])
        setSortBy("newest")
    }

    if (loading) {
        return (
            <div className="container py-12">
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
                    <span className="text-lg">Loading proposals...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-12">
                <div className="text-center py-12 border rounded-lg bg-muted/30">
                    <p className="text-destructive">Error loading proposals. Please try again later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">All Proposals</h1>
                    <p className="text-muted-foreground max-w-[600px]">
                        Browse and filter all proposals funded by the Algorand xGov community governance program.
                    </p>
                </div>
            </div>

            {/* Search and filter section */}
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 mb-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Filters</h3>

                        <div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search proposals..." className="pl-9" value={searchQuery} onChange={handleSearch} />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2">Categories</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`category-${category}`}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2">Status</h4>
                            <div className="space-y-2">
                                {statuses.map((status) => (
                                    <div key={status} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`status-${status}`}
                                            checked={selectedStatus.includes(status)}
                                            onCheckedChange={() => handleStatusChange(status)}
                                        />
                                        <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                                            {status}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2">Completion Percentage</h4>
                            <div className="px-2">
                                <Slider
                                    defaultValue={[0, 100]}
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={completionRange}
                                    onValueChange={handleCompletionRangeChange}
                                    className="my-4"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{completionRange[0]}%</span>
                                    <span>{completionRange[1]}%</span>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                            Clear Filters
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">{paginatedProposals.length}</span> of{" "}
                            <span className="font-medium">{filteredProposals.length}</span> proposals
                        </p>

                        <div className="flex items-center gap-2">
                            <Select value={sortBy} onValueChange={handleSortChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                                    <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                                    <SelectItem value="funding-high">Funding (High to Low)</SelectItem>
                                    <SelectItem value="funding-low">Funding (Low to High)</SelectItem>
                                    <SelectItem value="completion-high">Completion (High to Low)</SelectItem>
                                    <SelectItem value="completion-low">Completion (Low to High)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {filteredProposals.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-muted/30">
                            <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-xl font-medium mb-2">No proposals found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                            <Button variant="outline" className="mt-4" onClick={clearFilters}>
                                Clear All Filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {paginatedProposals.map((proposal) => (
                                    <ProposalCard key={proposal.id} proposal={proposal} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(1)}
                                            disabled={currentPage === 1}
                                        >
                                            First
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>

                                        <div className="flex items-center gap-1 mx-2">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                // Show pages around current page
                                                let pageNum = currentPage - 2 + i

                                                // Adjust if we're at the beginning
                                                if (currentPage < 3) {
                                                    pageNum = i + 1
                                                }

                                                // Adjust if we're at the end
                                                if (currentPage > totalPages - 2) {
                                                    pageNum = totalPages - 4 + i
                                                }

                                                // Ensure page number is valid
                                                if (pageNum > 0 && pageNum <= totalPages) {
                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={currentPage === pageNum ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className="w-8 h-8 p-0"
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    )
                                                }
                                                return null
                                            })}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(totalPages)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Last
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProposalCard({ proposal }: { proposal: Proposal }) {
    return (
        <Card className="flex flex-col h-full">
            <CardContent className="flex-1 pt-6">
                <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">{proposal.category || "General"}</Badge>
                    <Badge
                        variant={
                            proposal.status === "Completed" ? "default" : proposal.status === "In Progress" ? "secondary" : "outline"
                        }
                    >
                        {proposal.status}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{proposal.title}</h3>

                <div className="flex items-center mb-3 text-sm">
                    <span className="text-muted-foreground">{proposal.team}</span>
                    {proposal.claimed && (
                        <>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                            >
                                <CheckCircle className="h-3 w-3" />
                                Claimed
                            </Badge>
                        </>
                    )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{proposal.description}</p>

                <div className="space-y-3 mt-auto">
                    <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span>{proposal.completionPercentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${proposal.completionPercentage}%` }}
                        ></div>
                    </div>

                    {proposal.fundingAmount && (
                        <div className="flex justify-between text-sm">
                            <span>Funding</span>
                            <span>{proposal.fundingAmount.toLocaleString()} ALGO</span>
                        </div>
                    )}

                    {proposal.awardDate && (
                        <div className="flex justify-between text-sm">
                            <span>Awarded</span>
                            <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(proposal.awardDate).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-2 pb-6">
                <Button asChild variant="default" size="sm">
                    <Link href={`/proposal/${proposal.number}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>

                <div className="flex items-center space-x-1">
                    {proposal.github && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                            <Link href={proposal.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                    )}

                    {proposal.website && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                            <Link href={proposal.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-4 w-4" />
                                <span className="sr-only">Website</span>
                            </Link>
                        </Button>
                    )}

                    {proposal.twitter && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                            <Link href={proposal.twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}

