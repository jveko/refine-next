"use client";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";
import { ContentLayout } from "@components/layout";
import { ConfigProvider } from "antd";
import { GlobalStyle, themeConfig } from "@antd";

export default function BaseLayout({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider theme={themeConfig}>
      <GlobalStyle />
      <SessionProvider>
        <Suspense fallback={"Loading.."}>
          <ContentLayout>{children}</ContentLayout>
        </Suspense>
      </SessionProvider>
    </ConfigProvider>
  );
}