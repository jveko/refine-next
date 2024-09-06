"use client";

import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Avatar,
  Layout as AntdLayout,
  Space,
  theme,
  Typography,
  Row,
  Col,
} from "antd";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const HeaderContent: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { data, status } = useSession();
  const { token } = useToken();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        {(data?.user?.name || data?.user?.image) && (
          <Space style={{ marginLeft: "8px" }} size="middle">
            {data?.user?.name && data?.user?.email &&
              <>
                <Text strong>
                  {data.user.name}
                </Text>
              </>
            }
            {data?.user?.image &&
              <Avatar src={data?.user?.image} alt={"Avatar"} />
            }
          </Space>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
