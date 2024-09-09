"use client";
import { AxiosInstance, isAxiosError } from "axios";
import { AccessControlProvider } from "@refinedev/core";
import { DOMAIN_APP } from "@constants";
import { axiosAuth } from "@instances";

type CheckPermissionResponse = {
  isAllowed: boolean;
};

const accessControlProviderFactory = (
  httpClient: AxiosInstance
): AccessControlProvider => ({
  can: async ({ resource, action, params }) => {
    try {
      const resp = await httpClient.get<CheckPermissionResponse>(
        "permissions/check",
        {
          params: {
            domain: DOMAIN_APP,
            resource: resource,
            subject: "",
            action: action,
          },
        }
      );
      return {
        can: resp.data.isAllowed,
      };
    } catch (e) {
      if (isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            return {
              can: false,
              reason: "Unauthorized",
            };
          case 403:
            return {
              can: false,
              reason: "Forbidden",
            };
        }
      }
      return {
        can: false,
        reason: (e as { message: string }).message,
      };
    }
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
    queryOptions: {},
  },
});

export const accessControlProvider = accessControlProviderFactory(axiosAuth);
