import axios from "@/lib/AxiosMethods";
import { CompleteWorkspaceTaskRequest } from "@/types/workspaceTasks/CompleteWorkspaceTaskRequest";
import { CreateWorkspaceTaskRequest } from "@/types/workspaceTasks/CreateWorkspaceTaskRequest";
import { WorkspaceTaskFilters } from "@/types/workspaceTasks/WorkspaceTasksFilters";
import { toLocalDateString } from "@/utils/dateUtils";

export const ManageWorkspaceTasks = () => {
  const getTasks = (workspaceId: string, filters?: WorkspaceTaskFilters) => {
    const params = new URLSearchParams();

    if (filters?.fromDate) {
      params.append("fromDate", toLocalDateString(filters.fromDate));
    }

    if (filters?.toDate) {
      params.append("toDate", toLocalDateString(filters.toDate));
    }
    if (filters?.status !== undefined)
      params.append("status", filters.status.toString());
    if (filters?.completedByUserId)
      params.append("completedByUserId", filters.completedByUserId);

    const query = params.toString();
    const url = `/api/v1/workspaces/${workspaceId}/tasks${query ? `?${query}` : ""}`;
    return axios.getData(url);
  };

  const createTask = (
    workspaceId: string,
    request: CreateWorkspaceTaskRequest,
  ) => axios.postData(`/api/v1/workspaces/${workspaceId}/tasks`, request);

  const completeTask = (
    workspaceId: string,
    taskId: string,
    request: CompleteWorkspaceTaskRequest,
  ) =>
    axios.patchData(
      `/api/v1/workspaces/${workspaceId}/tasks/${taskId}/complete`,
      request,
    );

  return {
    getTasks,
    createTask,
    completeTask,
  };
};
