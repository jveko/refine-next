"use client";

import { RefineList } from "@components/ui/refine";
import { useList } from "@refinedev/core";

export default function DashboardsList() {
  const { data } = useList({
    resource: "class-business/option",
  })
  // console.log(data)
  return (
    <RefineList title={"Dashboardssss"}>
    </RefineList>
  );
}