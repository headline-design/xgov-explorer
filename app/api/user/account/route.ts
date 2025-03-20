import { getSession, withSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE user account connection
export const DELETE = withSession(async ({ req }) => {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Assuming the front-end sends which provider to disconnect.
  // If req = { provider: 'discord' }, then disconnect (delete) the Discord account.
  // If req = { walletAddress: '0x1234...' }, then disconnect (delete) the wallet.
  const { provider, walletAddress } = await req.json();

  if (!provider && !walletAddress) {
    return new Response("Missing provider or walletAddress", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (provider && walletAddress) {
    return new Response("Cannot disconnect both provider and walletAddress", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (provider) {
      try {
        // Disconnect the account in the database
        await prisma.account.deleteMany({
          where: {
            userId: session.user.id,
            provider: provider,
          },
        });

        return new Response(null, { status: 204 });
      } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Internal Server Error", {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (walletAddress) {
      try {
        // Disconnect the wallet in the database
        await prisma.wallet.deleteMany({
          where: {
            userId: session.user.id,
            address: walletAddress,
          },
        });

        return new Response(null, { status: 204 });
      } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Internal Server Error", {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response("User not found", {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("DELETE Error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fallback response in case none of the above conditions match
  return new Response("Bad Request", {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
});
