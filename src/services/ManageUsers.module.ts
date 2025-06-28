import axios from "@/lib/AxiosMethods";
export const ManageUsersService = () => {
  const getAllUsers = () => axios.getData("/api/v1/users");

  return {
    getAllUsers,
  };
};
