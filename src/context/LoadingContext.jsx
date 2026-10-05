import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

const LoadingContext = createContext({
  isLoading: false,
  activeRequests: 0,
});

export function LoadingProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    // Request interceptor: Increment active counter
    const reqInterceptor = apiClient.interceptors.request.use(
      (config) => {
        // Skip background or silent requests if flag passed
        if (!config.silent) {
          setActiveRequests((prev) => prev + 1);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor: Decrement active counter
    const resInterceptor = apiClient.interceptors.response.use(
      (response) => {
        if (!response.config?.silent) {
          setActiveRequests((prev) => Math.max(0, prev - 1));
        }
        return response;
      },
      (error) => {
        if (!error.config?.silent) {
          setActiveRequests((prev) => Math.max(0, prev - 1));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(reqInterceptor);
      apiClient.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const isLoading = activeRequests > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, activeRequests }}>
      {/* Top Thin Progress Bar for global API activity */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none transition-all duration-300 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-full bg-gradient-to-r from-[#003087] via-[#e8471e] to-[#f5a623] animate-pulse" />
      </div>
      {children}
    </LoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  return useContext(LoadingContext);
}
