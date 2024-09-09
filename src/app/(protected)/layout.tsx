import React from "react";
import { auth } from "@auth";
import { redirect } from "next/navigation";
import { FullScreenLoading } from "@components/ui/loading";

export default async function ProtectedLayout({ children }: React.PropsWithChildren) {

  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  console.log(session);
  if (session.user) {
    return children;
  }

  return <FullScreenLoading message="Loading..." />;
}
