"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { ProjectDialogs } from "./project-dialogs";
import { ProjectActionsContext } from "./project-actions-context";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export function EditorShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogs = useProjectDialogs();

  return (
    <ProjectActionsContext.Provider
      value={{
        openCreate: dialogs.openCreate,
        openRename: dialogs.openRename,
        openDelete: dialogs.openDelete,
      }}
    >
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ProjectDialogs {...dialogs} />
      <div className="pt-12 flex flex-1 flex-col">{children}</div>
    </ProjectActionsContext.Provider>
  );
}
