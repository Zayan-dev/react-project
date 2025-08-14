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
import type { AxiosError } from "axios";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, refetch } = useRefreshToken({ enabled: false });
  const accessToken = Cookies.get("access-token");

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  useLayoutEffect(() => {
    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config: any) => {
        // Add auth token if available
        config.headers.Authorization =
          accessToken && !config._retry
            ? `Bearer ${accessToken}`
            : config.headers.Authorization;

        // Add request timestamp
        (config as any).metadata = { startTime: new Date() };

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }, [accessToken]);

  useLayoutEffect(() => {
    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (
          error?.status == 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          try {
            await refetch();
            if (data?.data?.accessToken) {
              Cookies.set("access-token", data.data.accessToken);
              originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
              originalRequest._retry = true; // prevent infinite loop
              return axiosInstance(originalRequest); // retry the request
            }
          } catch (refreshError) {
            console.error("Refresh token failed", refreshError);
            setIsAuthenticated(false);
            Cookies.remove("access-token");
            Cookies.remove("refresh-token");
          }
        }

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
