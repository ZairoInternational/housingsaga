 "use client";

import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useAuthStore } from "@/store/AuthStore";

type NextAuthUser = {
  id?: string;
  role?: "OWNER" | "BUYER";
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type NextAuthSession = {
  accessToken?: string;
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
      if (s.user?.role) {
        setRole(s.user.role);
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

