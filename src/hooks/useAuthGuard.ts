"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/AuthStore";

export const useAuthGuard = () => {
  const { accessToken, refreshToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        await refreshToken();
        if (!useAuthStore.getState().accessToken) {
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [accessToken, refreshToken, router]);
};
