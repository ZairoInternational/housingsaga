 "use client";

import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useAuthStore } from "@/store/AuthStore";

type NextAuthUser = {
  id?: string;
  role?: "owner" | "buyer" | "admin";
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type NextAuthSession = {
  accessToken?: string;
  role?: "owner" | "buyer" | "admin" | null;
  user?: NextAuthUser | null;
} | null;

export default function AuthSync(): React.ReactElement | null {
  const { data: session } = useSession();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRole = useAuthStore((s) => s.setRole);

  useEffect(() => {
    let mounted = true;

    const applySession = (s: NextAuthSession) => {
      if (!mounted || !s) return;
      if (s.accessToken) {
        setAccessToken(s.accessToken);
      }
      if (s.role) {
        setRole(s.role);
      }
    };

    // reactive session first
    applySession(session as NextAuthSession);

    // also fetch explicitly to ensure the session is available after redirect/hydration
    (async () => {
      try {
        const fetched = (await getSession()) as NextAuthSession;
        applySession(fetched);
      } catch {
        // ignore
      }
    })();

    return () => {
      mounted = false;
    };
  }, [session, setAccessToken, setRole]);

  return null;
}

