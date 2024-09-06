import { BaseKey, BaseRecord } from "@refinedev/core";

export type IUserPhoto = {
  avatar: string;
};

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
