import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../components/utils/axiosInstance";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRefreshToken } from "../services/auth";

const AuthContext = createContext<any | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { mutateAsync } = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = Cookies.get("access-token");

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  useLayoutEffect(() => {
    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = Cookies.get("access-token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp
        (config as any).metadata = { startTime: new Date() };

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.message === "Unauthorized") {
          console.log("object: ", error);
          const data = await mutateAsync({
            authorization: Cookies.get("refresh-token"),
          });
          if (data) {
            Cookies.set("access-token", data?.data.accessToken);
            return error.config;
          }
        }

        console.log("error : ", error);
        return Promise.reject(error);
      }
    );
  }, []);

  const value: any = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
