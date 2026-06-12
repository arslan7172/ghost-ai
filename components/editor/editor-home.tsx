"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectActions } from "@/components/editor/project-actions-context";

export function EditorHome() {
  const { openCreate } = useProjectActions();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Create a project or open an existing one
        </h1>
        <p className="text-sm text-muted-foreground">
          Start a new architecture workspace, or choose a project from the sidebar.
        </p>
      </div>
      <Button onClick={openCreate}>
        <Plus className="h-4 w-4 mr-2" />
        New Project
      </Button>
    </main>
  );
}
