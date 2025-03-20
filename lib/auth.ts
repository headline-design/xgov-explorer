import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import { getSearchParams } from "@/lib/utils";
import { SiwaMessage } from "@avmkit/siwa";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export interface Session {
  user: {
    email: string;
    id: string;
    name: string;
    nfd?: string;
    provider?: string;
    accessToken?: string;
    image?: string;
  };
}

export interface Profile {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  login?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "algorand",
      name: "Algorand",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        transaction: {
          label: "Transaction",
          type: "text",
          placeholder: "0x0",
        },
        domain: {
          label: "Domain",
          type: "text",
          placeholder: "example.com",
        },
        provider: {
          label: "Provider",
          type: "text",
          placeholder: "Algorand",
        },
        nfd: {
          label: "NFD",
          type: "text",
          placeholder: "HELLO_WORLD",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("Credentials are undefined");
          }
          const siwa = new SiwaMessage(JSON.parse(credentials.message || "{}"));
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");
          const validDomain =
            siwa.domain === nextAuthUrl.host ? nextAuthUrl.host : "";

          const verifyData: any = {
            signature: credentials.signature,
            encodedTransaction: credentials?.transaction || null,
            domain: validDomain,
            nonce: siwa.nonce,
          };

          if (
            credentials?.nfd &&
            credentials.nfd !== "null" &&
            credentials.nfd !== "undefined"
          ) {
            verifyData.nfd = credentials.nfd;
          }

          // VerifyParams
          const { data: fields, success } = await siwa.verify({
            ...verifyData,
          });

          if (fields && success) {
            const authResult = await handleWalletAuth(fields, "AVM");
            return authResult;
          }
        } catch (error) {
          console.error("Algorand auth error:", error);
        }
        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { scope: "read:user user:email repo" },
      },
      profile(profile: any) {
        return {
          id: (profile as Profile).id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          gh_username: profile.login,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "", verifyRequest: "", error: "" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT ? "xgov.app" : "localhost",
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account?.provider) return false;
      if (!user.email) {
        const session = await getSession();
        if (!session?.user.id) return false;

        user.email =
          session.user.email ||
          `${user.name || user.username || session.user.id}@${
            account.provider
          }-provider.com`;
      }

      if (["github", "algorand"].includes(account?.provider)) {
        await handleOAuthSignIn(user, account, profile);
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.email) return {};

      if (account?.provider) {
        token.provider = account.provider;
      }
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        token.githubId = (profile as Profile).id.toString();
      }

      if (user) token.user = user;

      // refresh the user's data if they update their name / email
      if (token.trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
          include: {
            wallets: true,
          },
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        vm: (token.vm as string) || "Unknown VM",
        ...(typeof token.user === "object" ? token.user : {}),
        // Add the provider information here
        provider: token.provider as string,
        wallets: (token.user as { wallets: any[] })?.wallets || [],
        role: (token.user as { role: string })?.role || "user", // Default role added
        gh_username:
          (token.user as { gh_username: string | null })?.gh_username || null, // Ensure gh_username is included
      };
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser && message.user.email) {
        await handleNewUserSignIn(message.user.email);
      }
    },
  },
};

async function handleOAuthSignIn(user: any, account: any, profile: any) {
  const userExists = await prisma.user.findUnique({
    where: { email: user.email },
    select: { name: true, gh_username: true, gitProvider: true },
  });

  if (userExists && !userExists.name) {
    await prisma.user.update({
      where: { email: user.email },
      data: {
        name: profile?.name,
        gh_username: profile?.login,
        image: profile?.picture || profile?.avatar_url,
      },
    });
  }

  if (
    account?.provider === "github" &&
    userExists &&
    (!userExists.gh_username || !userExists.gitProvider)
  ) {
    await prisma.user.update({
      where: { email: user.email },
      data: {
        gh_username: profile?.login,
        gitProvider: "github",
      },
    });
  }
}

async function handleNewUserSignIn(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true, gh_username: true, createdAt: true },
  });

  if (
    user?.createdAt &&
    new Date(user.createdAt).getTime() > Date.now() - 10000
  ) {
    console.log("hello");
  }
}

interface WithSessionHandler {
  ({
    req,
    params,
    searchParams,
    session,
  }: {
    req: Request;
    params;
    searchParams: Record<string, string>;
    session: Session;
  }): Promise<Response>;
}

export const withSession =
  (handler: WithSessionHandler) =>
  async (req: Request, { params }) => {
    const session = await getSession();
    if (!session?.user.id) {
      return new Response("Unauthorized: Login required.", { status: 401 });
    }

    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams, session });
  };

export default NextAuth(authOptions);

export async function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      gh_username: any;
      vm: string;
      role: any;
      id: string;
      name: string;
      username: string;
      provider: string;
      email: string;
      image: string;
    };
  } | null>;
}

/**
 * Handles wallet authentication and extracts relevant blockchain info.
 * Returns a structured user object.
 */
async function handleWalletAuth(
  data: any,
  vm: "AVM" | "EVM" | "SVM" | "Substrate"
) {
  const address = data?.address;
  const session = await getSession();
  const emailProvider = vm.toLowerCase();
  let user: any;
  let wallet: any;

  // Check if user exists
  if (session?.user?.id) {
    user = {
      id: session.user.id,
      provider: session.user.provider || emailProvider,
      vm,
      name: address,
      email: `${address}@${emailProvider}.web3`,
    };
    wallet = {
      address,
      chainId: data.chainId,
      userId: user.id,
      status: "active",
      vm,
    };
  } else if (!session?.user?.id) {
    user = {
      id: data?.id || uuidv4(),
      provider: emailProvider,
      name: address,
      email: `${address}@${emailProvider}.web3`,
      vm,
    };
    wallet = {
      address,
      chainId: data.chainId,
      userId: user.id,
      status: "active",
      vm,
    };
  }

  const profile = {
    ...user,
    wallets: [wallet],
  };

  return profile;
}

export function withUserAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession();
    if (!session?.user.id) return res.status(401).end("Unauthorized");
    return handler(req, res, session);
  };
}

export async function getAuthToken(req: NextApiRequest) {
  return getToken({ req });
}

export function withPublic(handler: any) {
  return async (req: Request, { params }) => {
    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams, headers: {} });
  };
}
