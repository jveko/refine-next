import { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "eq":
      return "==";
    case "ne":
      return "!=";
    case "lt":
      return "<";
    case "gt":
      return ">";
    case "lte":
      return "<=";
    case "gte":
      return ">=";
    case "in":
    case "nin":
      return "|=";
    case "contains":
    case "ncontains":
      return "-=-";
    case "containss":
    case "ncontainss":
      return "-=-*";
    case "null":
      return "=="; 
    case "startswith":
    case "nstartswith":
      return "=-";
    case "startswiths":
    case "nstartswiths":
      return "=-*";
    case "endswith":
    case "nendswith":
      return "-=";
    case "endswiths":
    case "nendswiths":
      return "-=*";
    default:
      return "";
  }
};
