import { CrudFilters } from "@refinedev/core";
import { mapOperator } from "./mapOperator";

export const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: string[] = [];
  if (filters) {
    filters.map((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        throw new Error(
          `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`
        );
      }

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters.push(`${field} ==* ${value}`);
          return;
        }

        const mappedOperator = mapOperator(operator);
        console.log(value, typeof value);
        if (
          Array.isArray(value) &&
          value.every((v: string) => v === "true" || v === "false")
        ) {
          queryFilters.push(
            `${field} ${mappedOperator.replace("*", "")} ${value.join(",")}`
          );
          return;
        } else if (typeof value === "boolean") {
          queryFilters.push(
            `${field} ${mappedOperator.replace("*", "")} ${value}`
          );
          return;
        } else if (typeof value === "string") {
          queryFilters.push(`${field} ${mappedOperator} '${value}'`);
          return;
        } else if (Array.isArray(value)) {
          queryFilters.push(
            `${field} ${mappedOperator} ${value.map((x) => `'${x}'`).join(",")}`
          );
          return;
        }
        queryFilters.push(`${field} ${mappedOperator} ${value}`);
      }
    });
  }

  return queryFilters.join(" & ");
};
