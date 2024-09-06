import "next-auth/jwt";
import AzureAD from "next-auth/providers/azure-ad";
import { NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
  }
}
const {
  AUTH_AZURE_AD_CLIENT_ID,
  AUTH_AZURE_AD_CLIENT_SECRET,
  AUTH_AZURE_AD_TENANT_ID,
  AUTH_AZURE_AD_CUSTOM_SCOPE,
} = process.env;
if (
  !AUTH_AZURE_AD_CLIENT_ID ||
  !AUTH_AZURE_AD_CLIENT_SECRET ||
  !AUTH_AZURE_AD_TENANT_ID ||
  !AUTH_AZURE_AD_CUSTOM_SCOPE
) {
  throw new Error("The Azure AD environment variables are not set.");
}

const scope = `openid profile email offline_access ${AUTH_AZURE_AD_CUSTOM_SCOPE}`;

export const authOptions = {
  providers: [
    AzureAD({
      clientId: AUTH_AZURE_AD_CLIENT_ID,
      clientSecret: AUTH_AZURE_AD_CLIENT_SECRET,
      tenantId: AUTH_AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: scope,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token!,
          refreshToken: account.refresh_token!,
          accessTokenExpiresAt: account.expires_at! * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpiresAt) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthOptions;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `https://login.microsoftonline.com/${AUTH_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id: AUTH_AZURE_AD_CLIENT_ID!,
      client_secret: AUTH_AZURE_AD_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
      scope: scope,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    var expiresAt = Date.now() + (refreshedTokens.expires_in * 1000 - 1000 * 5);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpiresAt: expiresAt,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
