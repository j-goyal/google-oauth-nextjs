import axios from "@/lib/AxiosMethods";
import { GoogleAuthRequest } from "@/types/auth/GoogleAuthRequest";

export const ManageAuth = () => {
  const loginWithGoogle = (payload: GoogleAuthRequest) =>
    axios.postData("/api/v1/auth/google", payload, { withCredentials: true });

  const getCurrentUser = () =>
    axios.getData("/api/v1/auth/me");

  const deleteCurrentUser = () =>
    axios.deleteData("/api/v1/auth/me");

  const refreshToken = () =>
    axios.postData("/api/v1/auth/refresh", undefined, { withCredentials: true });

  return {
    loginWithGoogle,
    getCurrentUser,
    deleteCurrentUser,
    refreshToken
  };
};
