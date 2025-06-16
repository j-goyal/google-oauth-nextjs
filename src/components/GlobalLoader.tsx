'use client';

import { useEffect, useRef, useState } from 'react';
import axios from "@/lib/axios"
import { Loader } from 'lucide-react';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pendingRequest = useRef(0);

  useEffect(() => {
   
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        pendingRequest.current++;
        setIsLoading(true);
        return config;
      },
      (error) => {
        pendingRequest.current = Math.max(0, pendingRequest.current - 1);
        if (pendingRequest.current === 0) setIsLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        pendingRequest.current = Math.max(0, pendingRequest.current - 1);
        if (pendingRequest.current === 0) setIsLoading(false);
        return response;
      },
      (error) => {
        pendingRequest.current = Math.max(0, pendingRequest.current - 1);
        if (pendingRequest.current === 0) setIsLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Loader className="w-12 h-12 text-white animate-spin" />
        </div>
      )}
    </>
  );
}
