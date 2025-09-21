"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export type User = {
  fullName: string;
  email: string;
  bio: string;
  avatarUrl: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
  fullName: "AgriVision User",
  email: "farmer@agrivision.io",
  bio: "Dedicated to sustainable and innovative farming practices.",
  avatarUrl: getPlaceholderImage("user-avatar-1")?.imageUrl || "",
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
