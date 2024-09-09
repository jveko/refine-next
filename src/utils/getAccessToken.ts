"use server";
import { auth } from "@auth";

export const getAccessToken = async () => {
  var token = await auth();
  if (token) {
    return token.accessToken;
  }
  return undefined;
};
