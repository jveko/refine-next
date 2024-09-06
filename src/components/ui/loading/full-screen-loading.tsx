import { Spin } from "antd";

type Props = {
  message?: string;
}
export const FullScreenLoading = ({ message }: Props) => {
  return (
    <Spin
      size="large"
      tip={<div style={{ fontSize: 20 }}>{message || "Loading..."}</div>}
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div></div>
    </Spin >
  );
}