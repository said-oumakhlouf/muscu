"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload, AuthContextType } from "@/interfaces/auth";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthState {
  token: string | null;
  role: string | null;
  userId: number | null;
  isLoading: boolean;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    role: null,
    userId: null,
    isLoading: true,
  });

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t) {
      const decoded = jwtDecode<JwtPayload>(t);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setAuthState({
        token: t,
        role: decoded.role,
        userId: decoded.sub,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (t: string) => {
    sessionStorage.setItem("token", t);
    document.cookie = `token=${t}; path=/; SameSite=Strict`;
    const decoded = jwtDecode<JwtPayload>(t);
    setAuthState({
      token: t,
      role: decoded.role,
      userId: decoded.sub,
      isLoading: false,
    });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthState({
      token: null,
      role: null,
      userId: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        role: authState.role,
        userId: authState.userId,
        isLoading: authState.isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
