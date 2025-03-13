import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronRight, ExternalLink, BarChart3, Coins, Users, Tags } from "lucide-react"
import { AlgorandIcon } from "./icons/algorand-icon"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  totalProjects: number
  totalFunding: number
  uniqueTeams: number
  categories: string[]
}

export function HeroSection({ totalProjects, totalFunding, uniqueTeams, categories }: HeroSectionProps) {
  // Format the funding amount properly
  const formatFunding = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    }
    return amount.toString()
  }

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Modern, clean background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBMNjAgME0wIDMwTDMwIDBNMzAgNjBMNjAgMzBNMCAwTDYwIDYwTTAgMEwzMCAzME0zMCAzMEw2MCA2MCIvPjwvZz48L3N2Zz4=')] opacity-[0.03] z-0"></div>

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Subtle accent shape */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/5 to-transparent opacity-70"></div>

      <div className="container relative z-10 px-4 py-20 md:py-32 lg:py-40">
        <div className="flex flex-col items-center max-w-5xl mx-auto text-center">
          {/* Logo and title */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <AlgorandIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">xGov Explorer</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="block">Discover Innovative</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Algorand Projects
            </span>
          </h1>

          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl mb-12">
            Explore the best projects awarded through the Algorand Foundation xGov community governance program.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12 w-full">
            {[
              { value: totalProjects, label: "Funded Projects", icon: BarChart3, format: (v: number) => v.toString() },
              { value: totalFunding, label: "ALGO Funded", icon: Coins, format: formatFunding },
              { value: uniqueTeams, label: "Unique Teams", icon: Users, format: (v: number) => v.toString() },
              { value: categories.length, label: "Categories", icon: Tags, format: (v: number) => v.toString() },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center p-6 rounded-xl",
                  "bg-card/50 backdrop-blur-sm",
                  "border border-border/50",
                  "shadow-sm transition-shadow duration-300",
                )}
              >
                <div className="mb-3 p-2 rounded-full bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.format(stat.value)}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button asChild size="lg" className="group">
              <Link href="#projects" className="flex items-center">
                Explore Projects
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/projects" className="flex items-center">
                View Teams
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg" className="group">
              <Link href="https://algorand.foundation/xgov" target="_blank" className="flex items-center">
                About xGov
                <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

