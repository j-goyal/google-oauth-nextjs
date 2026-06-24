import axios from "@/lib/AxiosMethods";
import { CompleteWorkspaceTaskRequest } from "@/types/workspaceTasks/CompleteWorkspaceTaskRequest";
import { CreateWorkspaceTaskRequest } from "@/types/workspaceTasks/CreateWorkspaceTaskRequest";

export const ManageWorkspaceTasks = () => {
  const getTasks = (workspaceId: string) =>
    axios.getData(`/api/v1/workspaces/${workspaceId}/tasks`);

  const createTask = (workspaceId: string, request: CreateWorkspaceTaskRequest) => 
    axios.postData(`/api/v1/workspaces/${workspaceId}/tasks`, request);

  const completeTask = (workspaceId: string, taskId: string, request: CompleteWorkspaceTaskRequest) =>
    axios.patchData(`/api/v1/workspaces/${workspaceId}/tasks/${taskId}/complete`, request);

  return {
    getTasks,
    createTask,
    completeTask,
  };
};
