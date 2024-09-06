"use server";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";

export const getAccessToken = async () => {
  var token = await getToken({
    req: {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    } as NextApiRequest,
  });
  if (token) {
    return token.accessToken;
  }
  return undefined;
};
