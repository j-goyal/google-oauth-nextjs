import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@/lib/AxiosMethods";
import { isAxiosError } from "axios";
import { ManageAuth } from "@/services/ManageAuth.module";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ManageMe } from "@/services/ManageMe.module";
import { SessionDto } from "@/types/sessions/SessionDto";
import { isGloballyHandledError } from "@/utils/isGloballyHandledError";

interface CurrentUser {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  profilePic: string | null;
  isAuthenticated: boolean;
  lastLoginAt?: string | null;
}

interface AuthState {
  userLogged: CurrentUser;
  softDeletedUserEmail?: string;
  isAuthResolved: boolean;
  login: (idToken: string) => Promise<"success" | "softDeleted" | "error">;
  logoutCurrentSession: () => Promise<void>;
  logoutAllSessions: () => Promise<void>;
  logoutOtherSessions: () => Promise<SessionDto | undefined>;
  deleteAccount: () => Promise<boolean>;
  setUser: (userData: Partial<CurrentUser>) => void;
  resetUser: () => void;
  verifyTokenOnLoad: () => Promise<void>;
  clearSoftDeletedUser: () => void;
  confirmRestoreUser: () => Promise<void>;
}

const initialUserState: CurrentUser = {
  id: null,
  name: null,
  email: null,
  role: null,
  profilePic: null,
  isAuthenticated: false,
  lastLoginAt: null,
};

const authService = ManageAuth();
const meService = ManageMe();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userLogged: initialUserState,
      isAuthResolved: false,
      login: async (
        idToken: string
      ): Promise<"success" | "softDeleted" | "error"> => {
        try {
          const response = await authService.loginWithGoogle({ idToken });

          if (!response.success) {
            throw new Error(getErrorMessage(response.error));
          }

          const {
            token,
            encryptedRefreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            ...userData
          } = response.data;
          axios.setToken(
            token,
            tokenExpiresAt,
            encryptedRefreshToken,
            refreshTokenExpiresAt
          );

          set({ userLogged: { ...userData, isAuthenticated: true } });

          toast.success("Successfully logged in !");
          return "success";
        } catch (err: unknown) {
          if (isAxiosError(err)) {
            const backendResponse = err.response?.data;
            if (
              backendResponse?.error?.details === "SOFT_DELETED_USER" &&
              backendResponse?.data?.requiresRestore
            ) {
              set({
                softDeletedUserEmail: backendResponse.data?.email,
              });
              return "softDeleted";
            }
            toast.error(getErrorMessage(backendResponse?.error));
          } else {
            toast.error("Something went wrong while logging in.");
          }
          return "error";
        }
      },

      clearSoftDeletedUser: () => set({ softDeletedUserEmail: undefined }),

      confirmRestoreUser: async () => {
        const email = get().softDeletedUserEmail;
        if (!email) {
          toast.error("Email not found to restore.");
          return;
        }
        try {
          const response = await authService.confirmRestoreUser({ email });

          if (!response.success) {
            throw new Error(getErrorMessage(response.error));
          }

          const {
            token,
            encryptedRefreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            ...userData
          } = response.data;

          axios.setToken(
            token,
            tokenExpiresAt,
            encryptedRefreshToken,
            refreshTokenExpiresAt
          );
          set({
            userLogged: { ...userData, isAuthenticated: true },
            softDeletedUserEmail: undefined,
          });

          toast.success("Account restored successfully and logged in.");
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast.error(err.message);
          } else {
            toast.error("Something went wrong while restoring account.");
          }
        }
      },

      logoutCurrentSession: async () => {
        try {
          await meService.logoutCurrentSession();
          get().resetUser();
          toast.success("Logged out from current session.");
        } catch (error: unknown) {
          if (isGloballyHandledError(error)) return;
          toast.error("Failed to log out.");
        }
      },

      logoutAllSessions: async () => {
        try {
          await meService.logoutAllSessions();
          get().resetUser();
          toast.success("Logged out from all sessions.");
        } catch (error: unknown) {
          if (isGloballyHandledError(error)) return;
          toast.error("Failed to log out from all sessions.");
        }
      },

      logoutOtherSessions: async () => {
        try {
          const response = await meService.logoutOtherSessions();
          if (response.success) {
            return response.data;
          } else {
            toast.error(getErrorMessage(response.error));
          }
        } catch (error: unknown) {
          if (isGloballyHandledError(error)) return;
          toast.error("Failed to log out from other sessions.");
        }
      },

      deleteAccount: async () => {
        try {
          await meService.deleteCurrentUser();
          get().resetUser();
          toast.success("Account deleted successfully");
          return true;
        } catch (err: unknown) {
          if (isGloballyHandledError(err)) return false;
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
          get().resetUser();
          return;
        }

        try {
          const response = await meService.getCurrentUser();
          set((state) => ({
            userLogged: {
              ...state.userLogged,
              ...response.data,
              isAuthenticated: true,
            },
            isAuthResolved: true,
          }));
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 401 || status === 404) {
              get().resetUser();
            } else {
              console.warn("Network/server error during token verification:", error.message);
              set({ isAuthResolved: true });
            }
          } else {
            console.error("Unexpected error during token verification:", error);
            set({ isAuthResolved: true });
          }
        }
      },

      resetUser: () => {
        set({ userLogged: { ...initialUserState }, isAuthResolved: true });
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
