import { ILoggedUser } from "@/services/auth/types";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import { auth } from "../services/auth/auth.service";

interface IAuthContext {
  authenticateUser: () => Promise<void>;
  user: ILoggedUser | null;
  setUser: (user: ILoggedUser | null) => void;
  logOut: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  storeToken: (token: string) => void;
  getToken: () => string | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authenticateUser: () => Promise.resolve(),
  user: null,
  setUser: () => {},
  logOut: () => Promise.resolve(),
  storeToken: () => {},
  getToken: () => null,
  isLoading: true,
  setIsLoading: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ILoggedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await auth.verify();
      setUser(userData);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const getToken = (): string | null => {
    return localStorage.getItem("authToken");
  };

  const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await localStorage.removeItem("authToken");
    setUser(null);
    setIsLoading(false);
    router.push("/login");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        user,
        setUser,
        logOut,
        storeToken,
        getToken,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
