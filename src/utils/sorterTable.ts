import {CrudSort} from "@refinedev/core";
import {SortOrder} from "antd/es/table/interface";

export const sorterTable = (fieldName: string, sorters: CrudSort[]) => {
  const order = sorters.find((sorter: CrudSort) => sorter.field === fieldName)?.order
  const sortOrder = order === "asc" ? ("ascend" as SortOrder) : order === "desc" ? ("descend" as SortOrder) : null
  return {
    sorter: true,
    sortOrder,
    showSorterTooltip: true
  }
}