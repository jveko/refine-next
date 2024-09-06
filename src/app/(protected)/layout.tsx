"use client"
import { FullScreenLoading } from "@components/ui/loading";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { ContentLayout } from "@components/layout";
import { ConfigProvider } from "antd";
import { GlobalStyle, themeConfig } from "@antd";
import { authProvider } from "@providers";
import { useLogin, useLogout } from "@refinedev/core";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <Layout>{children}</Layout>
    </SessionProvider>
  );
}

const Layout = ({ children }: React.PropsWithChildren) => {
  const { status, data: session } = useSession();
  const { mutate: logout } = useLogout();

  if (session && session.user && session.accessTokenExpiresAt !== null) {
    if (Date.now() > session.accessTokenExpiresAt) {
      logout()
    }
  }

  if (status === "loading") {
    return <FullScreenLoading message="Loading..." />;
  }



  return (
    <ConfigProvider theme={themeConfig}>
      <GlobalStyle />
      <ContentLayout>{children}</ContentLayout>
    </ConfigProvider>
  );
}