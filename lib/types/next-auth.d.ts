import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      /**
       * The user's provider virtual machine
       */
      vm: string;

      /**
       * The user's web3 provider
       */
      provider: string;

      email?: string | null;

      /**
       * The user's unique id number
       */
      id?: string | null;

      /**
       * The users preferred avatar.
       * Usually provided by the user's OAuth provider of choice
       */
      image?: string | null;

      /**
       * The user's full name
       */
      name?: string | null;

      /**
       * The user's custom & public username viewable to others
       */
      username?: string | null;

      /**
       * The user's wallets
       */
      wallets?: any[];
    };
  }

  interface User {
    /**
     * The user's email address
     */
    email?: string | null;

    /**
     * The user's unique id number
     */
    id: string;

    /**
     * The users preferred avatar.
     * Usually provided by the user's OAuth provider of choice
     */
    image?: string | null;

    /**
     * The user's full name
     */
    name?: string | null;

    /**
     * The user's custom & public username viewable to others
     */
    username?: string | null;
  }
}
