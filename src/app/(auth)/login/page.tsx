"use client"
import React from "react";
import { WindowsFilled } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { LoginContainer } from "@features/login";
import Image from "next/image";

const authWrapperProps = {
  style: {
    background: `url(/static/background-login.jpg) center`,
    backgroundSize: "cover",
  },
};

export default function LoginPage() {
  const { styles } = useStyles();
  return (
    <LoginContainer
      wrapperProps={authWrapperProps}
      renderContent={(content) => (
        <div
          style={{
            maxWidth: "400px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            paddingTop: "15px",
          }}
        >
          <Image src={"/static/logo.png"} alt={"Logo"}
            style={{
              width: "25%",
              height: "auto",
              paddingTop: "15px",
            }} width={"100"} height={"100"} />
          {content}
        </div>
      )}
      contentProps={{
        style: {
          backgroundColor: "#0A5D9A",
          border: "#0A5D9A",
          borderRadius: "32px",
          padding: "30px",
          marginTop: "30px",
        },
        className: styles.card,
      }}
      hideForm={true}
      rememberMe={true}
      registerLink={false}
      forgotPasswordLink={false}
      providers={[
        {
          name: "microsoft",
          label: "Microsoft",
          icon: <WindowsFilled />,
        },
      ]}
    />
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      ".ant-btn": {
        color: "#ffff",
        "&:hover": {
          color: "black",
        },
      },
    },
  };
});
