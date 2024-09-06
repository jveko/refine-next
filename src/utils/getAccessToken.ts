"use server";
import { TOKEN_KEY } from "@constants";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export const getAccessToken = async () => {
  var token = await getToken({
    req: {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    },
  });
  if (token) {
    return token.accessToken;
  }
  return undefined;
};
