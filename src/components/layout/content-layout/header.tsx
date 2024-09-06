"use client";

import { IUserPhoto } from "@interfaces";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
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
  const { data: session, status } = useSession();
  const { token } = useToken();

  const { data: photo, isLoading: isLoadingPhoto } = useOne<IUserPhoto>({

  })

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
        {(session?.user?.name) && (
          <Space style={{ marginLeft: "8px" }} size="middle">
            {session?.user?.name && session?.user?.email &&
              <>
                <Text strong>
                  {session.user.name}
                </Text>
              </>
            }
            {!isLoadingPhoto && photo &&
              <Avatar src={photo?.data.avatar} alt={"Avatar"} />
            }
          </Space>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
