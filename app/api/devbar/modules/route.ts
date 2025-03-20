import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const modules = await prisma.devbarModule.findMany();
    return NextResponse.json(modules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const module = await prisma.devbarModule.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        isActive: data.isActive,
        devNotes: data.devNotes,
      },
    });
    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const module = await prisma.devbarModule.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        isActive: data.isActive,
        devNotes: data.devNotes,
      },
    });
    return NextResponse.json(module);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update module' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
    }
    await prisma.devbarModule.delete({ where: { id } });
    return NextResponse.json({ message: 'Module deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete module' }, { status: 500 });
  }
}