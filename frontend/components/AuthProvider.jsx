"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_access_token");

    async function restoreSession() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const profile = await apiRequest("profile/", undefined, token);
        setUser(profile);
      } catch {
        localStorage.removeItem("auth_access_token");
        localStorage.removeItem("auth_refresh_token");
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  async function logIn(tokens) {
    localStorage.setItem("auth_access_token", tokens.access);
    localStorage.setItem("auth_refresh_token", tokens.refresh);
    const profile = await apiRequest("profile/", undefined, tokens.access);
    setUser(profile);
  }

  function logOut() {
    localStorage.removeItem("auth_access_token");
    localStorage.removeItem("auth_refresh_token");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, isLoading, logIn, logOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
