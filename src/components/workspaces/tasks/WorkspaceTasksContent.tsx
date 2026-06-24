"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { WorkspaceTaskResponse } from "@/types/workspaceTasks/WorkspaceTaskResponse";
import { getErrorMessage } from "@/utils/getErrorMessage";
import GridShimmer from "@/components/shimmer/GridShimmer";
import WorkspaceTaskTable from "@/components/workspaces/tasks/WorkspaceTaskTable";
import CreateTaskDialog from "@/components/workspaces/tasks/CreateTaskDialog";
import CompleteTaskDialog from "@/components/workspaces/tasks/CompleteTaskDialog";
import WorkspaceTaskDetailsDialog from "@/components/workspaces/tasks/taskDetailDialog/WorkspaceTaskDetailsDialog";
import { ManageWorkspaceTasks } from "@/services/ManageWorkspaceTasks.module";
import WorkspacePermissionGuard from "@/components/guards/WorkspacePermissionGuard";
import { WorkspacePermission } from "@/enums/workspaces/workspacePermission";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface Props {
  workspaceId: string;
}

export default function WorkspaceTasksContent({ workspaceId }: Props) {
  const manageWorkspaceTasks = ManageWorkspaceTasks();
  const workspace = useWorkspaceStore((state) => state.currentWorkspace);
  const [tasks, setTasks] = useState<WorkspaceTaskResponse[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<WorkspaceTaskResponse | null>(null);
  const [detailsTask, setDetailsTask] = useState<WorkspaceTaskResponse | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await manageWorkspaceTasks.getTasks(workspaceId);

      if (response.success) {
        setTasks(response.data);
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while fetching tasks. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [workspaceId]);

  const handleCompleteTask = (task: WorkspaceTaskResponse) => {
    setSelectedTask(task);
  };
  const handleViewDetails = (task: WorkspaceTaskResponse) => {
    setDetailsTask(task);
  };

  const handleCloseCompleteDialog = () => {
    setSelectedTask(null);
  };

  if (!workspace) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>

            <p className="text-gray-500">Manage workspace tasks.</p>
          </div>
          <WorkspacePermissionGuard
            workspace={workspace}
            permission={WorkspacePermission.CreateTask}
          >
            <Button onClick={() => setOpenCreateDialog(true)}>
              Create Task
            </Button>
          </WorkspacePermissionGuard>
        </div>
        {loading ? (
          <GridShimmer
            showHeader={false}
            rowCount={4}
            columns={[
              "Task Date",
              "Title",
              "Status",
              "Completed By",
              "Actions",
            ]}
          />
        ) : (
          <WorkspaceTaskTable
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      <CreateTaskDialog
        isOpen={openCreateDialog}
        workspaceId={workspaceId}
        onClose={() => setOpenCreateDialog(false)}
        onTaskCreated={fetchTasks}
      />

      <WorkspaceTaskDetailsDialog
        isOpen={!!detailsTask}
        task={detailsTask}
        onClose={() => setDetailsTask(null)}
      />

      <CompleteTaskDialog
        isOpen={!!selectedTask}
        workspaceId={workspaceId}
        task={selectedTask}
        onClose={handleCloseCompleteDialog}
        onTaskCompleted={fetchTasks}
      />
    </>
  );
}
