import type {ConditionalFilter, CrudFilter, CrudFilters, CrudOperators, LogicalFilter} from "@refinedev/core";
import { TableProps } from "antd";

export type FilterValue = Parameters<
  NonNullable<TableProps["onChange"]>
>[1][string];
export const mapAntdFilterToCrudFilter = (
  tableFilters: Record<
    string,
    | FilterValue
    | (string | number | boolean)
    | (string | number | boolean)[]
    | null
  >,
  prevFilters: CrudFilters,
  initialFilters?: CrudFilters,
): CrudFilters => {
  const crudFilters: CrudFilters = [];
  const mapInitialFilter: Record<string, CrudFilter> = (
    initialFilters ?? []
  ).reduce((acc, item) => {
    const field =
      (item as ConditionalFilter).key || (item as LogicalFilter).field;
    return {...acc, [field]: item};
  }, {});
  Object.keys(tableFilters).map((field) => {
    const value = tableFilters[field];
    const operator =
      prevFilters
        .filter((i) => i.operator !== "or")
        .find((p: any) => p.field === field)?.operator ||
      mapInitialFilter[field]?.operator;

    if (Array.isArray(value) && value.length === 2 && (value[1].toString() as CrudOperators) == "contains") {
      crudFilters.push({
        field,
        operator: "contains",
        value: value[0].toString(),
      });
    } else if (Array.isArray(value) && value.length === 2 && (value[1].toString() as CrudOperators) == "eq") {
      crudFilters.push({
        field,
        operator: "eq",
        value: value[0].toString(),
      });
    } else if (Array.isArray(value) && value[value.length - 1] === "in") {
      crudFilters.push({
        field,
        operator: "in",
        value: value.slice(0, value.length - 1),
      });
    } else if (operator !== "or" && operator !== "and") {
      crudFilters.push({
        field,
        operator: operator ?? (Array.isArray(value) ? "in" : "eq"),
        value,
      });
    }
  });

  return crudFilters;
};