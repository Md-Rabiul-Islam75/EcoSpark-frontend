'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function syncUser() {
      try {
        const response = await getUser();
        const currentUser = response.data?.data || response.data;
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } catch {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsLoading(false);
      }
    }

    syncUser();
  }, []);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
