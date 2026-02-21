import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreInterface {
  isLoggedIn: boolean;
  accessToken: string | null;
  role: "OWNER" | "BUYER" | null;
  setAccessToken: (token: string | null) => void;
  setRole: (role: "OWNER" | "BUYER" | null) => void;
  refreshToken: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreInterface>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      role: null,
      setAccessToken: (token) =>
        set({ accessToken: token, isLoggedIn: Boolean(token) }),
      setRole: (role) => set({ role }),
      refreshToken: async () => {
        try {
          const res = await axios.get("api/users/refresh-user", {
            withCredentials: true,
          });
          set({ accessToken: res.data.accessToken, isLoggedIn: Boolean(res.data.accessToken) });
        } catch (err) {
          set({ accessToken: null });
          console.error("Refresh Token Failed", err);
        }
      },

      logout: async () => {
        await axios.post(
          "api/users/user-logout",
          {},
          { withCredentials: true }
        );
        set({ accessToken: null, isLoggedIn: false });
      },
    }),
    { name: "auth-storage" } // unique name for localStorage key
  )
);

// export const useAuthStore = create<AuthStoreInterface>()(
//   persist(
//     (set) => ({
//       isLoggedIn: false,
//       login: () => set({ isLoggedIn: true }),
//       logout: () => set({ isLoggedIn: false }),
//     }),
//     {
//       name: "auth-storage", // unique name for localStorage key
//     }
//   )
// );
