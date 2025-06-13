import { create } from "zustand";
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

export const useAuthStore = create<AuthState>((set) => ({
  userLogged: initialUserState,

  login: async (idToken) => {
    try {
      const response = await authService.loginWithGoogle({ idToken });

      if (!response.success) {
        throw new Error(getErrorMessage(response.error));
      }

      const { token, ...userData } = response.data;
      axios.setToken(token);

      set({ userLogged: { ...userData, isAuthenticated: true } });

      toast.success("Successfully logged in");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong while logging in.");
      }
    }
  },

  logout: () => {
    axios.removeToken();
    set({ userLogged: initialUserState });
    toast.success("Logged out successfully");
  },
}));
