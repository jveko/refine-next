"use client";

import type { AuthProvider } from "@refinedev/core";
import { signIn, signOut, useSession } from "next-auth/react";

export const authProvider: AuthProvider = {
  login: async () => {
    await signIn("microsoft-entra-id", {
      // callbackUrl: to ? to.toString() : "/",
      redirect: true,
    });
    return {
      success: true,
    };
  },
  logout: async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
    return {
      success: true,
    };
  },
  onError: async (error: any) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }
    return {
      error,
    };
  },
  check: async () => {
    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    return null;
  },
  getIdentity: async () => {
    return null;
  },
};
