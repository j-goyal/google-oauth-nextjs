import axios from "@/lib/AxiosMethods";
import { GoogleAuthRequest } from "@/types/auth/GoogleAuthRequest";

function loginWithGoogle(payload: GoogleAuthRequest) {
  return axios.postData("/api/v1/auth/google", payload);
}

function getProfile() {
  return axios.getData("/api/v1/auth/profile");
}

export const ManageAuth = () => {
  return {
    loginWithGoogle,
    getProfile,
  };
};
