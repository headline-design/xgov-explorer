import { User, Wallet } from '@prisma/client';
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface ExtendedUser extends User {
  wallets: Wallet[];
  connectedAccounts: any[];
}

interface UserContextData {
  user: ExtendedUser | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (force?: boolean) => void;
}

const UserContext = createContext<UserContextData>({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: () => {},
});

const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // we use fetchUser(true) to force a reload of the user data

  const fetchUser = useCallback(
    async (force = false) => {
      if (user && !force) {
        //console.log('User already loaded');
        setIsLoading(false);
        return;
      }
      if (!session?.user) {
        //console.log('No user in session');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      console.log('Fetching user');
      try {
        const res = await fetch('/api/user');
        console.log('Response from /api/user:', res);
        if (res.ok) {
          const data: ExtendedUser = await res.json();
          setUser(data);
          if (force) {
            await update();
          }
          setError(null);
        } else {
          console.error('Failed to fetch user data');
          setError('Failed to fetch user data');
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error fetching user:', message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [user, session, update],
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, error, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserContext, UserProvider, useUser };
