import axios from "@/lib/AxiosMethods";
import { UpdateUserAccessRequest } from "@/types/users/UpdateUserAccessRequestDto";

export const ManageUsersService = () => {
  const getAllUsers = () => axios.getData("/api/v1/users");
  const getUserSessionsByUserId = (userId: string) =>
    axios.getData(`/api/v1/users/${userId}/sessions`);
  const updateUserRoleByUserId = (userId: string, payload: { role: string }) =>
    axios.patchData(`/api/v1/users/${userId}/role`, payload);
  const getUserAccess = (userId: string) =>
    axios.getData(`/api/v1/users/${userId}/access`);
  const updateUserAccess = (userId: string, payload: UpdateUserAccessRequest) =>
    axios.patchData(`/api/v1/users/${userId}/access`, payload);

  return {
    getAllUsers,
    getUserSessionsByUserId,
    updateUserRoleByUserId,
    getUserAccess,
    updateUserAccess,
  };
};
