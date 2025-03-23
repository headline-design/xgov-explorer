import { getSession, withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isAddressWhitelisted } from "@/lib/wallet-utils";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// GET /api/user - get current user data
export const GET = withSession(async () => {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
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
      return new Response("User not found", {
        status: 404,
        headers: { "Content-Type": "application/json" },
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
        discord: !!user.accounts.some((acc) => acc.provider === "discord"),
        google: !!user.accounts.some((acc) => acc.provider === "google"),
        github: !!user.accounts.some((acc) => acc.provider === "github"),
        twitter: !!user.accounts.some((acc) => acc.provider === "twitter"),
      },
      wallets: user.wallets,
    };

    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error("GET Error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// PUT /api/user – edit a specific user
export const PUT = withSession(async ({ req }) => {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let { name, email, image } = await req.json();
  try {
    if (image && image.startsWith("data:")) {
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
      return new Response("Email is already in use.", { status: 422 });
    }
    return new Response(error.message, { status: 500 });
  }
});

// POST /api/user - update user data or perform user-related operations
export const POST = withSession(async ({ req }) => {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { action, ...data } = body;

    // Handle different actions
    switch (action) {
      case "update_profile":
        // Update user profile
        const updatedUser = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            name: data.name,
            // Add other fields as needed
          },
        });
        return NextResponse.json(updatedUser);

      case "add_wallet":
        // Add a new wallet
        const { address, name, provider, teamId } = data;

        if (!address) {
          return new Response("Wallet address is required", {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Check if wallet already exists for this user
        const existingWallet = await prisma.wallet.findFirst({
          where: {
            userId: session.user.id,
            address: address,
          },
        });

        if (existingWallet) {
          return new Response("Wallet already exists for this user", {
            status: 409,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Create the new wallet
        const wallet = await prisma.wallet.create({
          data: {
            address,
            network: "algorand",
            vm: "AVM",
            chainId: 1000, // Mainnet
            status: "connected",
            userId: session.user.id,
          },
        });

        // Check if the address is whitelisted for the team (if teamId is provided)
        let isWhitelisted = false;
        if (teamId) {
          isWhitelisted = await isAddressWhitelisted(address, teamId);
        }

        // Return the wallet with the isWhitelisted flag
        return NextResponse.json({
          ...wallet,
          isWhitelisted,
        });

      case "disconnect_wallet":
        // Disconnect a wallet (update status)
        const { address: disconnectAddress } = data;

        if (!disconnectAddress) {
          return new Response("Wallet address is required", {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Check if the wallet exists and belongs to the user
        const walletToDisconnect = await prisma.wallet.findFirst({
          where: {
            address: disconnectAddress,
            userId: session.user.id,
          },
        });

        if (!walletToDisconnect) {
          return new Response("Wallet not found", {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Update the wallet status to disconnected
        const disconnectedWallet = await prisma.wallet.update({
          where: {
            address: disconnectAddress,
          },
          data: {
            status: "disconnected",
          },
        });

        return NextResponse.json(disconnectedWallet);

      default:
        return new Response("Invalid action", {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("POST Error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// DELETE /api/user - delete user account or wallet
export const DELETE = withSession(async ({ req }) => {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // If address is provided, delete the wallet
    if (body.address) {
      const { address } = body;

      // Check if the wallet exists and belongs to the user
      const walletToDelete = await prisma.wallet.findFirst({
        where: {
          address,
          userId: session.user.id,
        },
      });

      if (!walletToDelete) {
        return new Response("Wallet not found", {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Delete the wallet
      await prisma.wallet.delete({
        where: {
          address,
        },
      });

      return new Response(null, { status: 204 });
    }
    // If no address is provided, delete the user account
    else {
      const response = await prisma.user.delete({
        where: {
          id: session.user.id,
        },
      });
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
