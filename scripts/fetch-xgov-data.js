import fetch from "node-fetch"
import fs from "fs/promises"

// URLs for xGov award results
const xGovDataUrls = [
  "https://api.voting.algorand.foundation/ipfs/bafkreigqdwoypnchizkcc7qdhop5pqxpibjacs6w2anbntyiet3pzrxlme", // Period 1
  "https://api.voting.algorand.foundation/ipfs/bafkreicyon6rwn6kwjesfkepi75fqfej3kde2jrgflyzmsuo6ydqst4foy", // Period 2
  "https://api.voting.algorand.foundation/ipfs/bafkreietvjzxff4lnrxo5pzuo4uvtd3cfc6qj5fyyrjpau2scblwwg63su", // Period 3
  "https://api.voting.algorand.foundation/ipfs/bafkreigjiien52ukmfqd5yrjgonrj6ixpr2rm32szps45ztpehk7z4lhli", // Period 4
]

// Categories mapping based on project titles/descriptions
const categorizeProject = (title, description) => {
  const titleLower = title.toLowerCase()
  const descLower = description.toLowerCase()

  if (
    titleLower.includes("defi") ||
    descLower.includes("defi") ||
    descLower.includes("finance") ||
    descLower.includes("lending") ||
    descLower.includes("swap") ||
    descLower.includes("trading")
  ) {
    return "defi"
  } else if (titleLower.includes("nft") || descLower.includes("nft") || descLower.includes("collectible")) {
    return "nft"
  } else if (
    titleLower.includes("dao") ||
    descLower.includes("dao") ||
    descLower.includes("governance") ||
    descLower.includes("voting")
  ) {
    return "governance"
  } else if (titleLower.includes("wallet") || descLower.includes("wallet")) {
    return "wallet"
  } else if (descLower.includes("education") || descLower.includes("learn") || descLower.includes("tutorial")) {
    return "education"
  } else if (descLower.includes("game") || descLower.includes("gaming") || descLower.includes("play")) {
    return "gaming"
  } else if (descLower.includes("identity") || descLower.includes("kyc") || descLower.includes("verification")) {
    return "identity"
  } else if (descLower.includes("analytics") || descLower.includes("data") || descLower.includes("metrics")) {
    return "analytics"
  } else if (descLower.includes("payment") || descLower.includes("pay")) {
    return "payments"
  } else if (descLower.includes("social") || descLower.includes("community")) {
    return "social"
  } else if (
    descLower.includes("infrastructure") ||
    descLower.includes("api") ||
    descLower.includes("sdk") ||
    descLower.includes("developer")
  ) {
    return "infrastructure"
  }

  return "other"
}

// Generate a random completion percentage for projects
const generateCompletionStatus = (awardDate) => {
  const awardTime = new Date(awardDate).getTime()
  const now = new Date().getTime()
  const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000

  // If award date is more than 6 months ago, likely completed
  if (now - awardTime > sixMonthsInMs) {
    return {
      status: "Completed",
      completionPercentage: 100,
    }
  }
  // If award date is recent, project is likely in progress
  else {
    const progress = Math.min(Math.floor(((now - awardTime) / sixMonthsInMs) * 100), 95)
    return {
      status: progress > 80 ? "In Progress" : "Planning",
      completionPercentage: progress,
    }
  }
}

// Main function to fetch and process data
async function fetchAndProcessXGovData() {
  const allProjects = []
  let projectId = 1

  for (let i = 0; i < xGovDataUrls.length; i++) {
    try {
      console.log(`Fetching data from ${xGovDataUrls[i]}...`)
      const response = await fetch(xGovDataUrls[i])
      const data = await response.json()

      // Extract period information
      const periodNumber = i + 1

      // Process projects based on the structure of the data
      if (data.results && Array.isArray(data.results)) {
        console.log(`Found ${data.results.length} projects in Period ${periodNumber}`)

        for (const result of data.results) {
          if (result.status === "pass") {
            const title = result.title || "Untitled Project"
            const description = result.description || ""
            const fundingAmount = Number.parseInt(result.requested_algos) || 0

            // Create award date (using a reasonable estimate if not available)
            let awardDate
            if (periodNumber === 1) awardDate = "2023-01-15"
            else if (periodNumber === 2) awardDate = "2023-04-15"
            else if (periodNumber === 3) awardDate = "2023-07-15"
            else if (periodNumber === 4) awardDate = "2023-10-15"

            // Generate completion status based on award date
            const { status, completionPercentage } = generateCompletionStatus(awardDate)

            // Extract team name from title or use a default
            let team = "Unknown Team"
            const teamMatch = title.match(/by\s+([^-]+)/) || description.match(/by\s+([^.]+)/)
            if (teamMatch) {
              team = teamMatch[1].trim()
            }

            // Determine category
            const category = categorizeProject(title, description)

            // Extract links if available
            const links = {}
            if (description) {
              const githubMatch = description.match(/github\.com\/([^\s]+)/)
              if (githubMatch) links.github = `https://github.com/${githubMatch[1]}`

              const websiteMatch = description.match(/(https?:\/\/[^\s]+)/)
              if (websiteMatch) links.website = websiteMatch[1]

              const twitterMatch = description.match(/twitter\.com\/([^\s]+)/)
              if (twitterMatch) links.twitter = `https://twitter.com/${twitterMatch[1]}`
            }

            // Create project object
            const project = {
              id: String(projectId++),
              title: title.replace(/by\s+[^-]+\s*-\s*/, "").trim(), // Clean up title
              description,
              team,
              category,
              fundingAmount,
              awardDate,
              status,
              completionPercentage,
              xGovPeriod: `Period ${periodNumber}`,
              image: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title)}`,
              proposalLink: result.link || "",
              ...links,
            }

            allProjects.push(project)
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching data from ${xGovDataUrls[i]}:`, error)
    }
  }

  console.log(`Total projects processed: ${allProjects.length}`)

  // Write the processed data to a file
  const outputData = `import { Project } from "@/types/project"

export const projects: Project[] = ${JSON.stringify(allProjects, null, 2)}`

  await fs.writeFile("data-output.js", outputData)
  console.log("Data written to data-output.js")
}

// Run the main function
fetchAndProcessXGovData()

