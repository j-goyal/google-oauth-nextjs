import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@/lib/AxiosMethods";
import { ManageAuth } from "@/services/ManageAuth.module";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface CurrentUser {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  profilePic: string | null;
  isAuthenticated: boolean;
}

interface AuthState {
  userLogged: CurrentUser;
  login: (idToken: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
  setUser: (userData: Partial<CurrentUser>) => void;
  resetUser: () => void;
  verifyTokenOnLoad: () => Promise<void>;
}

const initialUserState: CurrentUser = {
  id: null,
  name: null,
  email: null,
  role: null,
  profilePic: null,
  isAuthenticated: false,
};

const authService = ManageAuth();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userLogged: initialUserState,

      login: async (idToken) => {
        try {
          const response = await authService.loginWithGoogle({ idToken });

          if (!response.success) {
            throw new Error(getErrorMessage(response.error));
          }

          const { token, encryptedRefreshToken, tokenExpiresAt, refreshTokenExpiresAt, ...userData } = response.data;
          axios.setToken(token, tokenExpiresAt, encryptedRefreshToken, refreshTokenExpiresAt);

          set({ userLogged: { ...userData, isAuthenticated: true } });

          toast.success("Successfully logged in with Google!");
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err.message);
          } else {
            toast.error("Something went wrong while logging in.");
          }
        }
      },

      logout: () => {
        get().resetUser();
        toast.success("Logged out successfully");
      },

      deleteAccount: async () => {
        try {
          await authService.deleteCurrentUser();
          get().resetUser();
          toast.success("Account deleted successfully");
          return true;
        } catch (err: unknown) {
          toast.error(
            err instanceof Error
              ? err.message
              : "Something went wrong while deleting the account."
          );
          return false;
        }
      },

      verifyTokenOnLoad: async () => {
        const token = axios.getToken();

        if (!token) {
          set({ userLogged: { ...initialUserState } });
          return;
        }

        try {
          const response = await authService.getCurrentUser();
          set({ userLogged: { ...response.data, isAuthenticated: true } });
        } catch {
          axios.removeToken();
          set({ userLogged: { ...initialUserState } });
        }
      },

      resetUser: () => {
        set({ userLogged: { ...initialUserState } });
        axios.removeToken();
      },

      setUser: (userData: Partial<CurrentUser>) =>
        set((state) => ({
          userLogged: {
            ...state.userLogged,
            ...userData,
            isAuthenticated: true,
          },
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userLogged: state.userLogged,
      }),
    }
  )
);
