import { OpenNotificationParams } from "@refinedev/core";
import { isAxiosError } from "axios";

const capitalize = (string: string) => {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : "";
};
export const notificationError = <TError, TData, TVariables>(
  error: TError,
  errorResponse?: TData,
  values?: TVariables,
  resource?: string
): OpenNotificationParams => {
  if (isAxiosError(error)) {
    const statusCode = error.response?.status;
    const responseData = error.response?.data;
    switch (statusCode) {
      case 400:
        if (Array.isArray(responseData)) {
          const validationProblems = responseData.map(
            (item: { errorMessage: string }) => {
              return item.errorMessage;
            }
          );
          return {
            description: "Operation Failed (400)",
            message: `Validation Error, \n${validationProblems.join(", ")}`,
            type: "error",
          };
        }
        return {
          description: "Operation Failed (400)",
          message: "Bad Request. Please check the form",
          type: "error",
        };
      case 401:
        return {
          description: "Operation Failed (401)",
          message: "Unauthorized. Please refresh the page",
          type: "error",
        };
      case 403:
        return {
          description: "Operation Failed (403)",
          message: "You are not authorized to perform this action",
          type: "error",
        };
      case 405:
        return {
          description: "Operation Failed (405)",
          message: "Method Not Allowed",
          type: "error",
        };
      case 404:
        return {
          description: "Operation Failed (404)",
          message: "Resource not found",
          type: "error",
        };
      case 409:
        return {
          description: "Operation Failed (409)",
          message: "This document contains a value",
          type: "error",
        };
      case 500:
        return {
          description: "Operation Failed (500)",
          message: "Internal Server Error. Please contact the administrator",
          type: "error",
        };
      case 422:
        return {
          description: "Operation Failed (422)",
          message: `Validation Error, \n${responseData
            .map((item: { errorMessage: string }) => {
              return item.errorMessage;
            })
            .join(", ")}`,
          type: "error",
        };
      default:
        return {
          description: "Operation Failed (Unknown)",
          message: "Please contact the administrator",
          type: "error",
        };
    }
  }
  if (resource == undefined) {
    return {
      description: "Operation Failed",
      message: "Cooperation Agreement Type has been failed",
      type: "error",
    };
  }
  return {
    description: "Operation Failed",
    message: `${capitalize(resource.replace("-", ""))} has been failed`,
    type: "error",
  };
};
