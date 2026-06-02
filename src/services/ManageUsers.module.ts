import axios from "@/lib/AxiosMethods";
export const ManageUsersService = () => {
  const getAllUsers = () => axios.getData("/api/v1/users");
  const getUserSessionsByUserId = (userId: string) =>
    axios.getData(`/api/v1/users/${userId}/sessions`);
  const updateUserRoleByUserId = (userId: string, payload: { role: string }) =>
    axios.patchData(`/api/v1/users/${userId}/role`, payload);

  return {
    getAllUsers,
    getUserSessionsByUserId,
    updateUserRoleByUserId,
  };
};
