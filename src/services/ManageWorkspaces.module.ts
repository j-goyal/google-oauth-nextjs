import axios from "@/lib/AxiosMethods";
import { CreateWorkspaceRequest } from "@/types/workspaces/CreateWorkspaceRequest";

export const ManageWorkspaces = () => {
  const getMyWorkspaces = () => axios.getData("/api/v1/workspaces");

  const createWorkspace = (request: CreateWorkspaceRequest) =>
    axios.postData("/api/v1/workspaces", request);

  const getWorkspaceById = (workspaceId: string) =>
    axios.getData(`/api/v1/workspaces/${workspaceId}`);

  const joinWorkspace = (joinCode: string) =>
    axios.postData(`/api/v1/workspaces/join`, { joinCode });

  const getOverview = (workspaceId: string) => axios.getData(`/api/v1/workspaces/${workspaceId}/overview`)

  return {
    getMyWorkspaces,
    createWorkspace,
    getWorkspaceById,
    joinWorkspace,
    getOverview
  };
};
