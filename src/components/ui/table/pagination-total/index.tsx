import type {FC} from "react";

import {theme, Typography} from "antd";

type PaginationTotalProps = {
  total: number;
};

export const PaginationTotal: FC<PaginationTotalProps> = ({total}) => {
  const {token} = theme.useToken();
  return (
    <div
      style={{
        marginLeft: "16px",
        marginRight: "auto",
      }}
    >
      <Typography.Text
        style={{
          color: token.colorTextSecondary,
        }}
      >
        {total}
      </Typography.Text>{" "}
      <Typography.Text
        style={{
          color: token.colorTextTertiary,
        }}
      >
        {"Total Records "}
      </Typography.Text>
    </div>
  );
};
