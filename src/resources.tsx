import { IResourceItem } from "@refinedev/core";
import {
  DashboardFilled,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/dashboards",
    meta: {
      label: "Dashboard",
      icon: <DashboardFilled />,
    },
  },
];
