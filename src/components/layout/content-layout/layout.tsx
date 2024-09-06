"use client";
import React from "react";
import { Grid, Layout as AntdLayout } from "antd";

import {
  RefineThemedLayoutV2Props,
  ThemedHeaderV2 as DefaultHeader,
  ThemedLayoutContextProvider,
} from "@refinedev/antd";

import { SiderContent } from "./sider";
import { HeaderContent } from "./header";

export const ContentLayout: React.FC<RefineThemedLayoutV2Props> = ({
  children,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const SiderToRender = SiderContent;
  const HeaderToRender = HeaderContent;
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  const hasSider = !!SiderToRender({ Title });

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <AntdLayout style={{ minHeight: "100vh" }} hasSider={hasSider}>
        <SiderToRender Title={Title} />
        <AntdLayout>
          <HeaderToRender />
          <AntdLayout.Content>
            <div
              style={{
                minHeight: 360,
                padding: isSmall ? 24 : 12,
              }}
            >
              {children}
            </div>
            {OffLayoutArea && <OffLayoutArea />}
          </AntdLayout.Content>
          {Footer && <Footer />}
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};
