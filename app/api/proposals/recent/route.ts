import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch proposals with recent progress updates or that have been recently claimed
    const recentlyUpdated = await prisma.$transaction(async (tx) => {
      // Get proposals with recent progress updates
      const progressUpdates = await tx.progressUpdate.findMany({
        where: {
          // Get updates from the last 30 days
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          proposal: {
            include: {
              team_relation: true,
            },
          },
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      // Get recently claimed proposals
      const recentlyClaimed = await tx.proposal.findMany({
        where: {
          claimed: true,
          // Get proposals claimed in the last 30 days
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          // Only include proposals that were updated recently (claimed)
          createdAt: {
            not: {
              equals: tx.proposal.fields.updatedAt,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
        include: {
          team_relation: true,
        },
      });

      // Get proposals with recent status changes
      // Since we don't have a status history model, we'll look for proposals
      // where the status field was likely updated recently
      const statusChanges = await tx.proposal.findMany({
        where: {
          // Get proposals updated in the last 30 days
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          // Exclude proposals that were just created
          createdAt: {
            lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // At least 2 days old
          },
          // Exclude proposals that were just claimed (we already have those)
          claimed: false,
          // Focus on proposals with meaningful status
          status: {
            not: "Planning", // Assuming "Planning" is the default status
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
        include: {
          team_relation: true,
        },
      });

      return { progressUpdates, recentlyClaimed, statusChanges };
    });

    // Transform progress updates into the expected format
    const progressUpdatesFormatted = recentlyUpdated.progressUpdates.map(
      (update) => ({
        id: update.proposal.id,
        number: update.proposal.number,
        title: update.proposal.title,
        team: update.proposal.team_relation.name,
        teamImage: update.user.image || null, // Use user's image if available
        updateType: "progress" as const,
        updateDate: update.createdAt.toISOString(),
        updateDescription: update.content,
        completionPercentage: update.proposal.completionPercentage,
        category: update.proposal.category,
      })
    );

    // Transform recently claimed proposals into the expected format
    const recentlyClaimedFormatted = recentlyUpdated.recentlyClaimed.map(
      (proposal) => ({
        id: proposal.id,
        number: proposal.number,
        title: proposal.title,
        team: proposal.team_relation.name,
        teamImage: null, // Replace with a default value or handle appropriately
        updateType: "claimed" as const,
        updateDate: proposal.updatedAt.toISOString(),
        updateDescription: `The ${proposal.team_relation.name} team has officially claimed this proposal.`,
        completionPercentage: proposal.completionPercentage,
        category: proposal.category,
      })
    );

    // Transform status changes into the expected format
    const statusChangesFormatted = recentlyUpdated.statusChanges.map(
      (proposal) => ({
        number: proposal.number,
        id: proposal.id,
        title: proposal.title,
        team: proposal.team_relation.name,
        teamImage: null, // Replace with a default value or handle appropriately
        updateType: "status" as const,
        updateDate: proposal.updatedAt.toISOString(),
        updateDescription: `Status updated to "${proposal.status}". Current completion: ${proposal.completionPercentage}%.`,
        completionPercentage: proposal.completionPercentage,
        category: proposal.category,
      })
    );

    // Combine all updates, sort by date, and take the most recent 10
    const allUpdates = [
      ...progressUpdatesFormatted,
      ...recentlyClaimedFormatted,
      ...statusChangesFormatted,
    ]
      .sort(
        (a, b) =>
          new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      )
      .slice(0, 10);

    return NextResponse.json(allUpdates);
  } catch (error) {
    console.error("Error fetching recently updated proposals:", error);
    return NextResponse.json(
      { error: "Failed to fetch recently updated proposals" },
      { status: 500 }
    );
  }
}
