import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featureFlags = await prisma.devbarFeatureFlag.findMany();
    return NextResponse.json(featureFlags);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch feature flags" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const featureFlag = await prisma.devbarFeatureFlag.create({
      data: {
        name: data.name,
        description: data.description,
        isEnabled: data.isEnabled,
        moduleId: data.moduleId,
      },
    });
    return NextResponse.json(featureFlag, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create feature flag" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const featureFlag = await prisma.devbarFeatureFlag.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        isEnabled: data.isEnabled,
        moduleId: data.moduleId,
      },
    });
    return NextResponse.json(featureFlag);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update feature flag" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Feature flag ID is required" },
        { status: 400 },
      );
    }
    await prisma.devbarFeatureFlag.delete({ where: { id } });
    return NextResponse.json({ message: "Feature flag deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete feature flag" },
      { status: 500 },
    );
  }
}
