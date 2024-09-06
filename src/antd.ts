import type { ThemeConfig } from "antd";
import { createGlobalStyle } from "antd-style";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#ECF8FF",
    colorTextSecondary: "#185FA3",
    boxShadow: "none",
    // colorPrimaryBg: "#185FA3",
    // colorText:"rgba(17, 113, 190, 1)",
    // colorBgContainer: '#F0F2F5',
    colorBgElevated: "#FFFFFF",
    // colorPrimaryText: "rgba(0, 0, 0, 0.85)",
    // colorTextSecondary: "rgba(0, 0, 0, 0.65)",
    // colorTextTertiary: "rgba(0, 0, 0, 0.45)",
    // colorPrimary: "#1677FF",
    // colorBgContainer: "#F7F8F9",
    // colorBgLayout: "#F0F2F5",
    // colorBorderBg: "#E8E9EA",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  },
  components: {
    Table: {
      headerColor: "rgba(17, 113, 190, 1)",
      headerBg: "#F0F2F5",
      fontSize: 14,
    },
    Menu: {
      // itemHoverBg: "#0E5E9E",
      itemHoverColor: "#0E5E9E",
      itemSelectedBg: "rgba(0, 158, 247, 0.1)",
      itemSelectedColor: "rgba(17, 113, 190, 1)",
      fontSize: 14,
    },

    Button: {
      fontWeight: "bolder",
      primaryColor: "#185FA3",
      colorPrimaryHover: "#185FA3",
      colorText: "#185FA3",
      colorBorder: "#d9d9d9",
    },
    Input: {
      colorPrimary: "#185FA3",
      algorithm: true, // Enable algorithm
    },
    Layout: {
      lightSiderBg: "#0E5E9E",
      siderBg: "#0E5E9E",
    },
    Typography: {},
    Checkbox: {
      colorPrimary: "#185FA3",
    },
  },
};

export const GlobalStyle = createGlobalStyle(`
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner {
    background-color: #185FA3
  }
  .anticon {
    color: #185FA3;
  }
`);
