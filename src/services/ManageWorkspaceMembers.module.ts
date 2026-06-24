import axios from "@/lib/AxiosMethods";

export const ManageWorkspaceMembers = () => {
  const getMembers = (workspaceId: string) =>
    axios.getData(`/api/v1/workspaces/${workspaceId}/members`);

  const getInvitation = (workspaceId: string) =>
    axios.getData(`/api/v1/workspaces/${workspaceId}/invitation`);

  const toggleInvitation = (workspaceId: string, isInvitationActive: boolean) =>
    axios.patchData(`/api/v1/workspaces/${workspaceId}/invitation`, { isInvitationActive });

  const regenerateJoinCode = (workspaceId: string) =>
    axios.postData(`/api/v1/workspaces/${workspaceId}/invitation/regenerate`);

  const removeMember = (workspaceId: string, userId: string) =>
    axios.deleteData(`/api/v1/workspaces/${workspaceId}/members/${userId}`);

  return {
    getMembers,
    getInvitation,
    toggleInvitation,
    regenerateJoinCode,
    removeMember,
  };
};
