import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreInterface {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreInterface>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      refreshToken: async () => {
        try {
          const res = await axios.get("api/users/refresh-user", {
            withCredentials: true,
          });
          set({ accessToken: res.data.accessToken });
        } catch (err) {
          set({ accessToken: null });
          console.error("Refresh Token Failed");
        }
      },

      logout: async () => {
        await axios.post(
          "api/users/user-logout",
          {},
          { withCredentials: true }
        );
        set({ accessToken: null });
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
