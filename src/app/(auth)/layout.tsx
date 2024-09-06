import { redirect } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const data = await getData();

  if (data.session?.user) {
    return redirect("/");
  }

  return <>{children}</>;
}

async function getData() {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}