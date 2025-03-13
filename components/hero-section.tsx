import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  totalProjects?: number
  totalFunding?: number
  uniqueTeams?: number
  categories?: string[]
}

export function HeroSection({ totalProjects, totalFunding, uniqueTeams, categories }: HeroSectionProps) {

  const formatFunding = (amount: number | undefined): string => {
    if (amount === undefined) return "0"
    // format nmber of algos like 15M etc

    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    }
    return amount.toString()
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Algorand xGov Explorer
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explore the best projects awarded through the Algorand Foundation xGov community governance program.
            </p>
          </div>

          {totalProjects && totalFunding && categories && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 w-full max-w-3xl">
              <div className="bg-card rounded-lg p-6 shadow-sm dark:shadow-primary/5">
                <div className="text-3xl font-bold text-primary">{totalProjects}</div>
                <div className="text-sm text-muted-foreground">Funded Projects</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm dark:shadow-primary/5">
                <div className="text-3xl font-bold text-primary">{formatFunding(totalFunding)}</div>
                <div className="text-sm text-muted-foreground">Total Funding (ALGO)</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm dark:shadow-primary/5">
                <div className="text-3xl font-bold text-primary">{uniqueTeams || categories.length}</div>
                <div className="text-sm text-muted-foreground">{uniqueTeams ? "Unique Teams" : "Categories"}</div>
              </div>
            </div>
          )}

          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/teams">Explore Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg" >
              <Link href="https://algorand.foundation/xgov" target="_blank">
                Learn About xGov <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

