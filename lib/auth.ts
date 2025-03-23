import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import { getSearchParams } from "@/lib/utils";
import { SiwaMessage } from "@avmkit/siwa";
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
          (token.user as { gh_username?: string })?.gh_username ||
          (token.githubId ? (token as any).gh_username : undefined),
        teams: {
          count: 0,
          firstTeam: null,
        }, // Default teams property added
      };

      // Add team information to the session
      if (token.sub) {
        try {
          // Get the count of teams the user is a member of
          const teamCount = await prisma.teamMember.count({
            where: {
              userId: token.sub,
            },
          });

          // Get the first team if any exists (for direct navigation)
          let firstTeam: { id: string; name: string; role: string } | null =
            null;
          if (teamCount > 0) {
            const teamMember = await prisma.teamMember.findFirst({
              where: {
                userId: token.sub,
              },
              select: {
                teamId: true,
                role: true,
                team: {
                  select: {
                    name: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            });

            if (teamMember) {
              firstTeam = {
                id: teamMember.teamId,
                name: teamMember.team.name,
                role: teamMember.role,
              };
            }
          }

          // Add team information to the session
          session.user.teams = {
            count: teamCount,
            firstTeam: firstTeam ? firstTeam.id : null,
          };
        } catch (error) {
          console.error("Error fetching team information for session:", error);
          // Provide default values if there's an error
          session.user.teams = {
            count: 0,
            firstTeam: null,
          };
        }
      }

      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      // If this is a GitHub login, update the user's GitHub username
      if (account?.provider === "github" && profile) {
        await prisma.user
          .update({
            where: { id: user.id },
            data: { gh_username: (profile as any).login },
          })
          .catch(() => {
            // Ignore errors, as the user might not exist yet
          });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
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
  const address =
    vm === "AVM" ? data.address : vm === "EVM" ? data.address : data.address;
  const session = await getSession();
  const emailProvider = vm.toLowerCase();
  const chainId = 1000

  let wallet = await prisma.wallet.findUnique({ where: { address } });

  // If wallet does not exist, check for user or create user and wallet
  if (!wallet) {
    let user: any;

    // Check if user exists
    if (session?.user?.id) {
      user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });
    }

    if (!user) {
      // Create user associated with the wallet
      user = await prisma.user.create({
        data: {
          name: address,
          email: `${address}@${emailProvider}.web3`,
        },
      });
    }

    // Create wallet associated with the found or newly created user
    const userWallet = await prisma.wallet.create({
      data: {
        address,
        chainId: chainId,
        userId: user.id,
        vm: vm,
      },
    });

    // add wallet.status to the userWallet object
    wallet = userWallet;
    wallet.status = "active";

    const profile = {
      ...user,
      wallets: [userWallet],
    };

    return profile;
  } else {
    return await prisma.user.findUnique({
      where: { id: wallet.userId },
      include: { wallets: { where: { address: wallet.address } } },
    });
  }
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
