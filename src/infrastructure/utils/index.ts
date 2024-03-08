import { ILoggedUser } from "@/services/auth/types";

export const isAdmin = (user: ILoggedUser | null): boolean => {
  return user?.role === "ADMIN";
};

export const isDev = (): boolean => {
  return process.env.NODE_ENV && process.env.NODE_ENV === "development";
};

export const logDev = (...args: any[]): void => {
  if (isDev()) {
    console.log(...args);
  }
};
