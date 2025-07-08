import axios from "@/lib/AxiosMethods";
import { GoogleAuthRequest } from "@/types/auth/GoogleAuthRequest";

export const ManageAuth = () => {
  const loginWithGoogle = (payload: GoogleAuthRequest) =>
    axios.postData("/api/v1/auth/google", payload);

  const confirmRestoreUser = (payload: { email: string }) =>
    axios.postData("/api/v1/auth/google/confirm-restore", payload);

  return {
    loginWithGoogle,
    confirmRestoreUser,
  };
};
