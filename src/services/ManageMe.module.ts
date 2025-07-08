import axios from "@/lib/AxiosMethods";

export const ManageMe = () => {
  const getCurrentUser = () => axios.getData("/api/v1/me");

  const deleteCurrentUser = () => axios.deleteData("/api/v1/me");

  const logoutCurrentSession = () => axios.postData("/api/v1/me/sessions/logout");

  const logoutAllSessions = () => axios.postData("/api/v1/me/sessions/logout-all");

  const logoutOtherSessions = () => axios.postData("/api/v1/me/sessions/logout-others");

  return {
    getCurrentUser,
    deleteCurrentUser,
    logoutCurrentSession,
    logoutAllSessions,
    logoutOtherSessions,
  };
};
