import { create } from "zustand";

import { WorkspaceResponse } from "@/types/workspaces/WorkspaceResponse";

interface WorkspaceState {
  currentWorkspace: WorkspaceResponse | null;
  setWorkspace: (workspace: WorkspaceResponse) => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentWorkspace: null,

  setWorkspace: (workspace) =>
    set({
      currentWorkspace: workspace,
    }),

  clearWorkspace: () =>
    set({
      currentWorkspace: null,
    }),
}));
