import { getSession, withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// PUT /api/user – edit a specific user
export const PUT = withSession(async ({ req, session }) => {
  let { name, email, image } = await req.json();
  try {
    if (image) {
      const { secure_url } = await cloudinary.v2.uploader.upload(image, {
        public_id: session.user.id,
        folder: "avatars",
        overwrite: true,
        invalidate: true,
      });
      image = secure_url;
    }
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(image && { image }),
      },
    });
    return NextResponse.json(response);
  } catch (error: any) {
    if (error.code === "P2002") {
      // return res.status(422).end("Email is already in use.");
      return new Response("Email is already in use.", { status: 422 });
    }
    return new Response(error.message, { status: 500 });
  }
});

// DELETE /api/user – delete a specific user
export const DELETE = withSession(async ({ session }) => {

    const response = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });
    return NextResponse.json({ response });
  }
  );

// GET user data
export const GET = withSession(async (res) => {
  const session = await getSession();

  if (!session || !session.user) {
    console.log('Unauthorized');
    return new Response('Failed to fetch user data', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        gh_username: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,

        accounts: true,
        wallets: true,
      },
    });

    if (!user) {
      return new Response('User not found', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safeUserData = {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      gh_username: user.gh_username,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      connectedAccounts: {
        discord: !!user.accounts.some((acc) => acc.provider === 'discord'),
        google: !!user.accounts.some((acc) => acc.provider === 'google'),
        github: !!user.accounts.some((acc) => acc.provider === 'github'),
        twitter: !!user.accounts.some((acc) => acc.provider === 'twitter'),
      },
      wallets: user.wallets,
    };

    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error('GET Error:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});