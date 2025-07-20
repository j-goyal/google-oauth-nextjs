import axios from "@/lib/AxiosMethods";
export const ManageUsersService = () => {
  const getAllUsers = () => axios.getData("/api/v1/users");
  const getUserSessionsByUserId = (userId: string) => axios.getData(`/api/v1/users/${userId}/sessions`);

  return {
    getAllUsers,
    getUserSessionsByUserId
  };
};
