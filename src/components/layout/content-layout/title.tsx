import React from "react";
import {
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { LogoIcon } from "@components/ui/logo";
import { TITLE_APP } from "@constants";

export const TitleContent: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          <LogoIcon />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
              marginLeft: "16px",
            }}
          >
            {TITLE_APP}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};
