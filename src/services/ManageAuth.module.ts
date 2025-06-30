import axios from "@/lib/AxiosMethods";
import { GoogleAuthRequest } from "@/types/auth/GoogleAuthRequest";

export const ManageAuth = () => {
  const loginWithGoogle = (payload: GoogleAuthRequest) =>
    axios.postData("/api/v1/auth/google", payload);

  const getCurrentUser = () =>
    axios.getData("/api/v1/auth/me");

  const deleteCurrentUser = () =>
    axios.deleteData("/api/v1/auth/me");

  const confirmRestoreUser = (payload: { email: string }) =>
  axios.postData("/api/v1/auth/google/confirm-restore", payload);

  return {
    loginWithGoogle,
    getCurrentUser,
    deleteCurrentUser,
    confirmRestoreUser
  };
};
